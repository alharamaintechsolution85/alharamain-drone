import * as turf from '@turf/turf';

export type Coordinate = {
  lat: number;
  lng: number;
};

export type AddressMatch = {
  address: string;
  coords: Coordinate;
  note: string;
};

export const DEFAULT_ORIGIN: Coordinate = {
  lat: 21.4858,
  lng: 39.1925,
};

const NFZ_ZONES = [
  { name: 'NFZ-01', center: { lat: 21.4925, lng: 39.2057 }, radiusKm: 1.2 },
  { name: 'NFZ-02', center: { lat: 21.4791, lng: 39.1862 }, radiusKm: 1.6 },
  { name: 'High-Rise Corridor', center: { lat: 21.4838, lng: 39.1938 }, radiusKm: 0.9 },
];

export const ADDRESS_CATALOG: AddressMatch[] = [
  { address: 'Al Haramain Medical Center, Jeddah', coords: { lat: 21.4879, lng: 39.1928 }, note: 'Smart clinic distribution hub' },
  { address: 'King Fahd Hospital, Jeddah', coords: { lat: 21.5002, lng: 39.1914 }, note: 'Tertiary emergency medical unit' },
  { address: 'Jeddah Central Markets', coords: { lat: 21.4789, lng: 39.1788 }, note: 'High-density cargo route' },
  { address: 'Mina Road Logistics Hub', coords: { lat: 21.4696, lng: 39.1648 }, note: 'Battery swap station' },
  { address: 'Riyadh Street Pharmacy District', coords: { lat: 21.4956, lng: 39.2141 }, note: 'Last-mile pharmacy delivery zone' },
];

export function calculateDistanceKm(a: Coordinate, b: Coordinate) {
  return turf.distance([a.lng, a.lat], [b.lng, b.lat], { units: 'kilometers' });
}

export function lookupAddress(query: string): AddressMatch[] {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return ADDRESS_CATALOG.slice(0, 3);
  }

  return ADDRESS_CATALOG.filter((entry) => {
    const haystack = `${entry.address} ${entry.note}`.toLowerCase();
    return haystack.includes(trimmed);
  }).slice(0, 5);
}

export function buildSafeRoute(origin: Coordinate, destination: Coordinate, windSpeedKmh = 14) {
  const directKm = calculateDistanceKm(origin, destination);
  let noFlyWarnings = 0;
  let detourKm = 0;
  let safePath = true;

  for (const zone of NFZ_ZONES) {
    const zoneDistance = calculateDistanceKm(zone.center, origin) + calculateDistanceKm(zone.center, destination);
    if (directKm > zone.radiusKm * 1.5 && zoneDistance < directKm + 3) {
      noFlyWarnings += 1;
      detourKm += zone.radiusKm * 0.9;
      safePath = false;
    }
  }

  const totalKm = Number((directKm + detourKm + windSpeedKmh * 0.04).toFixed(2));
  const estimatedMinutes = Math.max(8, Math.ceil(totalKm * 5.2));
  const path = [
    origin,
    { lat: (origin.lat + destination.lat) / 2 + 0.018, lng: origin.lng + 0.02 },
    destination,
  ];

  return {
    path,
    totalKm,
    estimatedMinutes,
    safePath,
    noFlyWarnings,
    warning: safePath ? 'Safe route confirmed' : 'Detour applied around restricted airspace',
  };
}

export function estimateFlyableRange({
  batteryPercent,
  payloadKg,
  altitudeMeters,
  windSpeedKmh,
}: {
  batteryPercent: number;
  payloadKg: number;
  altitudeMeters: number;
  windSpeedKmh: number;
}) {
  const baseRangeKm = (batteryPercent / 100) * 17.5;
  const payloadPenalty = payloadKg * 2.1;
  const altitudePenalty = altitudeMeters * 0.0045;
  const windPenalty = windSpeedKmh * 0.09;
  const actualRange = Math.max(0.6, baseRangeKm - payloadPenalty - altitudePenalty - windPenalty);
  return Number(actualRange.toFixed(1));
}

export function calculateRthDecision({
  batteryPercent,
  payloadKg,
  altitudeMeters,
  windSpeedKmh,
  distanceKm,
}: {
  batteryPercent: number;
  payloadKg: number;
  altitudeMeters: number;
  windSpeedKmh: number;
  distanceKm: number;
}) {
  const range = estimateFlyableRange({ batteryPercent, payloadKg, altitudeMeters, windSpeedKmh });
  const reserveBufferKm = 1.4 + payloadKg * 0.35 + altitudeMeters / 400;
  const pointOfNoReturn = Math.max(0.5, range - reserveBufferKm);
  const shouldRth = batteryPercent <= 25 || range <= distanceKm + reserveBufferKm;

  return {
    range,
    reserveBufferKm: Number(reserveBufferKm.toFixed(1)),
    pointOfNoReturn: Number(pointOfNoReturn.toFixed(1)),
    shouldRth,
    recommendedAction: shouldRth ? 'Immediate return-to-home and safe landing' : 'Continue mission with normal tracking',
  };
}
