'use client';

import { motion } from 'framer-motion';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';
import type { DashboardSummary } from '@/types/api';

type FlightTelemetry = {
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  altitude: number;
  status: string;
  eta: string;
  timestamp: number;
};

const baseTelemetry: FlightTelemetry = {
  latitude: 21.4225,
  longitude: 39.8256,
  heading: 32,
  speed: 42,
  altitude: 120,
  status: 'En Route to Delivery Point',
  eta: '4 min',
  timestamp: Date.now(),
};

const mapStyles = {
  street: 'https://demotiles.maplibre.org/style.json',
  dark: 'https://tiles.openfreemap.org/styles/darkmatter',
};

function FlightMap({ data, style }: { data: FlightTelemetry; style: keyof typeof mapStyles }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const routeRef = useRef<maplibregl.GeoJSONSource | null>(null);
  const pathRef = useRef<[number, number][]>([
    [baseTelemetry.longitude, baseTelemetry.latitude],
    [baseTelemetry.longitude + 0.0021, baseTelemetry.latitude + 0.0015],
    [baseTelemetry.longitude + 0.0048, baseTelemetry.latitude + 0.0032],
  ]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyles[style],
      center: [data.longitude, data.latitude],
      zoom: 12.5,
      pitch: 36,
      bearing: 12,
      attributionControl: true,
    });

    mapRef.current = map;

    map.on('load', () => {
      map.addSource('flight-route', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: pathRef.current },
          }],
        },
      });

      map.addLayer({
        id: 'flight-route-layer',
        type: 'line',
        source: 'flight-route',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#5eead4', 'line-width': 4, 'line-opacity': 0.9 },
      });

      const markerElement = document.createElement('div');
      markerElement.style.width = '26px';
      markerElement.style.height = '26px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.border = '3px solid rgba(255,255,255,0.9)';
      markerElement.style.boxShadow = '0 0 16px rgba(34,211,238,0.8)';
      markerElement.style.background = 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #34d399 100%)';
      markerElement.style.position = 'relative';
      markerElement.style.transition = 'transform 0.35s ease';

      const dronePip = document.createElement('div');
      dronePip.style.position = 'absolute';
      dronePip.style.inset = '7px';
      dronePip.style.borderRadius = '50%';
      dronePip.style.background = 'rgba(255,255,255,0.92)';
      dronePip.style.boxShadow = '0 0 12px rgba(255,255,255,0.7)';
      markerElement.appendChild(dronePip);

      markerRef.current = new maplibregl.Marker({ element: markerElement }).setLngLat([data.longitude, data.latitude]).addTo(map);
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), 'top-right');

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setStyle(mapStyles[style]);
  }, [style]);

  useEffect(() => {
    if (!mapRef.current) return;

    const routePoints: [number, number][] = [...pathRef.current, [data.longitude, data.latitude]].slice(-8) as [number, number][];
    pathRef.current = routePoints;

    const routeSource = mapRef.current.getSource('flight-route') as maplibregl.GeoJSONSource | undefined;
    if (routeSource) {
      routeSource.setData({
        type: 'FeatureCollection',
        features: [{ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: routePoints } }],
      });
    }

    if (markerRef.current) {
      markerRef.current.setLngLat([data.longitude, data.latitude]).setRotation(data.heading);
      const markerElement = markerRef.current.getElement();
      markerElement.style.transform = `rotate(${data.heading}deg)`;
    }

    mapRef.current.easeTo({
      center: [data.longitude, data.latitude],
      zoom: 12.5,
      duration: 1300,
      essential: true,
    });
  }, [data]);

  return <div ref={mapContainerRef} className="h-[330px] w-full rounded-[22px]" />;
}

export function LiveTelemetry({ summary, loading, error }: { summary?: DashboardSummary; loading?: boolean; error?: string | null }) {
  const [flightTelemetry, setFlightTelemetry] = useState<FlightTelemetry>(baseTelemetry);
  const [mapStyle, setMapStyle] = useState<keyof typeof mapStyles>('street');
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFlightTelemetry((previous) => {
        const nextHeading = (previous.heading + 9) % 360;
        const drift = 0.0007;
        const nextLongitude = previous.longitude + Math.cos((nextHeading * Math.PI) / 180) * drift;
        const nextLatitude = previous.latitude + Math.sin((nextHeading * Math.PI) / 180) * drift;
        const nextAltitude = 118 + Math.sin(Date.now() / 1000) * 12;

        return {
          latitude: nextLatitude,
          longitude: nextLongitude,
          heading: nextHeading,
          speed: 38 + ((nextHeading % 25) * 0.8),
          altitude: nextAltitude,
          status: 'En Route to Delivery Point',
          eta: '3 min',
          timestamp: Date.now(),
        };
      });
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  const telemetry = summary?.liveTelemetry ?? {
    droneId: 'AH-102',
    altitude: Math.round(flightTelemetry.altitude),
    speed: Math.round(flightTelemetry.speed),
    battery: 76,
    eta: flightTelemetry.eta,
    status: flightTelemetry.status,
  };

  const recentEvents = summary?.recentEvents ?? [
    { name: 'AH-102', details: 'Departed from Distribution Hub', time: '2 min ago', status: 'success' },
    { name: 'AH-087', details: 'Delivered to Customer', time: '8 min ago', status: 'neutral' },
    { name: 'AH-066', details: 'Low Battery Warning', time: '12 min ago', status: 'warning' },
    { name: 'AH-041', details: 'En Route to Delivery Point', time: '15 min ago', status: 'success' }
  ];

  const liveStats = summary?.fleetSummary ?? {
    activeDrones: 24,
    deliveriesToday: 156,
    onTimeRate: 98,
    activeRoutes: 12,
  };

  const handleZoomIn = () => {
    const map = mapRef.current;
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    const map = mapRef.current;
    if (map) map.zoomOut();
  };

  const handleRecenter = () => {
    const map = mapRef.current;
    if (map) {
      map.flyTo({ center: [flightTelemetry.longitude, flightTelemetry.latitude], zoom: 12.5, essential: true });
    }
  };

  const handleToggleStyle = () => {
    setMapStyle((current) => (current === 'street' ? 'dark' : 'street'));
  };

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[28px] border border-slate-200 bg-[#0d1f36] p-4 shadow-soft"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="text-lg font-semibold">Live Flight Map</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleZoomOut}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-sm font-semibold text-slate-100"
            >
              −
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-sm font-semibold text-slate-100"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleRecenter}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-100"
            >
              Recenter
            </button>
            <button
              type="button"
              onClick={handleToggleStyle}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-100"
            >
              {mapStyle === 'street' ? 'Dark View' : 'Street View'}
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0d1f36]">
          <div className="absolute left-6 top-6 z-10 rounded-xl bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-100">{telemetry.droneId}</div>
          <div className="absolute right-6 top-6 z-10 rounded-xl bg-white/10 px-2 py-1 text-xs font-medium text-slate-100">Altitude {telemetry.altitude}m</div>
          <div className="absolute left-6 top-16 z-10 rounded-xl bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-100">ETA {telemetry.eta}</div>
          <div className="absolute right-6 top-16 z-10 rounded-xl bg-white/10 px-2 py-1 text-xs font-medium text-slate-100">{telemetry.status}</div>
          <FlightMap data={flightTelemetry} style={mapStyle} />
          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {telemetry.status}
          </div>
        </div>
      </motion.div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xl font-bold tracking-[-0.04em] text-[#0a243d]">Real-Time Overview</div>
          <button className="text-sm text-[#0d5c9e]">View All</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { value: liveStats.activeDrones.toString(), label: 'Active Drones' },
            { value: `${liveStats.deliveriesToday}`, label: 'Deliveries Today' },
            { value: `${liveStats.onTimeRate}%`, label: 'On-Time Rate' },
            { value: `${liveStats.activeRoutes}`, label: 'Active Routes' },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-2xl font-black tracking-[-0.06em] text-[#0a243d]">{card.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[20px] border border-slate-200 bg-slate-50 p-3">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-slate-500">
            <span>Telemetry</span>
            <span>{new Date(flightTelemetry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
            <div className="rounded-xl bg-white px-2 py-2">Heading: {Math.round(flightTelemetry.heading)}°</div>
            <div className="rounded-xl bg-white px-2 py-2">Speed: {Math.round(flightTelemetry.speed)} km/h</div>
            <div className="rounded-xl bg-white px-2 py-2">Altitude: {Math.round(flightTelemetry.altitude)}m</div>
            <div className="rounded-xl bg-white px-2 py-2">ETA: {flightTelemetry.eta}</div>
            <div className="rounded-xl bg-white px-2 py-2">Lat: {flightTelemetry.latitude.toFixed(4)}</div>
            <div className="rounded-xl bg-white px-2 py-2">Lon: {flightTelemetry.longitude.toFixed(4)}</div>
          </div>
        </div>

        {loading && <div className="mt-4 text-xs text-slate-500">Loading live telemetry…</div>}
        {error && <div className="mt-4 text-xs text-amber-700">Telemetry fallback active: {error}</div>}

        <div className="mt-5 space-y-3">
          {recentEvents.map((event) => (
            <div key={`${event.name}-${event.time}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${
                    event.status === 'warning' ? 'bg-amber-400' : event.status === 'neutral' ? 'bg-slate-400' : 'bg-emerald-500'
                  }`}
                />
                <div>
                  <div className="text-sm font-semibold text-slate-800">{event.name}</div>
                  <div className="text-xs text-slate-500">{event.details}</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-500">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
