'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, BatteryCharging, Droplets, MapPinned, Route, ShieldCheck, Thermometer, TimerReset } from 'lucide-react';
import { ADDRESS_CATALOG, buildSafeRoute, calculateRthDecision, estimateFlyableRange, lookupAddress } from '@/lib/autonomous';

const payloadDefaults = {
  payloadKg: 2.8,
  altitudeMeters: 110,
  batteryPercent: 65,
  windSpeedKmh: 16,
  tempC: 6.4,
  minTemp: 2,
  maxTemp: 8,
};

export function AutonomousFlightPanel() {
  const [address, setAddress] = useState('Al Haramain Medical Center, Jeddah');
  const [destination, setDestination] = useState(ADDRESS_CATALOG[0].coords);
  const [temperature, setTemperature] = useState(payloadDefaults.tempC);
  const [battery, setBattery] = useState(payloadDefaults.batteryPercent);
  const [payloadKg, setPayloadKg] = useState(payloadDefaults.payloadKg);
  const [altitude, setAltitude] = useState(payloadDefaults.altitudeMeters);
  const [windSpeed, setWindSpeed] = useState(payloadDefaults.windSpeedKmh);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState('');

  const matches = useMemo(() => lookupAddress(address), [address]);

  const route = useMemo(() => buildSafeRoute({ lat: 21.4858, lng: 39.1925 }, destination, windSpeed), [destination, windSpeed]);
  const range = useMemo(() => estimateFlyableRange({ batteryPercent: battery, payloadKg, altitudeMeters: altitude, windSpeedKmh: windSpeed }), [battery, payloadKg, altitude, windSpeed]);
  const rth = useMemo(() => calculateRthDecision({ batteryPercent: battery, payloadKg, altitudeMeters: altitude, windSpeedKmh: windSpeed, distanceKm: route.totalKm }), [battery, payloadKg, altitude, windSpeed, route.totalKm]);

  const temperatureAlarm = temperature < 2 || temperature > 8;
  const criticalPayload = temperatureAlarm || battery <= 25 || rth.shouldRth;

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0d5c9e]">Autonomous mission</div>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-[#0a243d]">Flight Execution & Address Delivery</h3>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${criticalPayload ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
            <ShieldCheck size={12} />
            {criticalPayload ? 'Mission caution' : 'All systems nominal'}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700 md:col-span-2">
            Address / Customer Pin Search
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300"
              placeholder="Enter address or customer pin"
            />
          </label>

          {matches.map((item) => (
            <button
              key={item.address}
              type="button"
              onClick={() => {
                setDestination(item.coords);
                setAddress(item.address);
              }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left text-sm text-slate-700 hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="font-semibold text-slate-800">{item.address}</div>
              <div className="mt-1 text-xs text-slate-500">{item.note}</div>
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Route size={16} className="text-[#0d5c9e]" />
            Route optimization
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Distance</div>
              <div className="mt-2 text-xl font-black text-[#0a243d]">{route.totalKm.toFixed(1)} km</div>
            </div>
            <div className="rounded-2xl bg-white p-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">ETA</div>
              <div className="mt-2 text-xl font-black text-[#0a243d]">{route.estimatedMinutes} min</div>
            </div>
            <div className="rounded-2xl bg-white p-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Route status</div>
              <div className="mt-2 text-sm font-semibold text-slate-800">{route.warning}</div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <BatteryCharging size={16} className="text-[#0d5c9e]" />
              Battery & range
            </div>
            <label className="block text-xs uppercase tracking-[0.18em] text-slate-500">
              Battery %
              <input type="range" min="10" max="100" value={battery} onChange={(event) => setBattery(Number(event.target.value))} className="mt-2 w-full accent-[#0d5c9e]" />
            </label>
            <div className="mt-3 text-sm text-slate-700">Range remaining: {range.toFixed(1)} km at {battery}% battery</div>
            <div className="mt-2 text-sm text-slate-700">PNR: {rth.pointOfNoReturn.toFixed(1)} km • {rth.recommendedAction}</div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Thermometer size={16} className="text-[#0d5c9e]" />
              Cold chain payload
            </div>
            <label className="block text-xs uppercase tracking-[0.18em] text-slate-500">
              Payload temperature
              <input type="range" min="-5" max="20" step="0.1" value={temperature} onChange={(event) => setTemperature(Number(event.target.value))} className="mt-2 w-full accent-[#0d5c9e]" />
            </label>
            <div className={`mt-3 text-sm font-medium ${temperatureAlarm ? 'text-red-600' : 'text-emerald-700'}`}>
              {temperature.toFixed(1)}°C • Safe band: 2°C – 8°C
            </div>
            {temperatureAlarm && (
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
                <AlertTriangle size={14} />
                Payload out of safe range — fast route priority triggered
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="rounded-full bg-[#0d5c9e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a4f92]">
            Pre-flight validation
          </button>
          <button type="button" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            Launch autonomous takeoff
          </button>
          <button type="button" onClick={() => setOtpOpen(true)} className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            OTP payload release
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold text-[#0a243d]">
            <MapPinned size={18} className="text-[#0d5c9e]" />
            Mission map
          </div>

          <div className="h-[260px] rounded-[24px] bg-[radial-gradient(circle_at_center,_rgba(14,116,144,0.2),_rgba(15,23,42,0.98)_60%,_rgba(2,6,23,1)_100%)] p-4">
            <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="absolute left-[32%] top-[38%] h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
              <div className="absolute left-[64%] top-[48%] h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.9)]" />
              <svg suppressHydrationWarning className="absolute inset-0 h-full w-full" viewBox="0 0 700 260" preserveAspectRatio="none">
                <path d="M120 160 C220 110, 320 120, 380 80 S530 60, 610 120" fill="none" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold text-[#0a243d]">
            <Droplets size={18} className="text-[#0d5c9e]" />
            Safe landing & return workflow
          </div>
          <ol className="space-y-3 text-sm text-slate-700">
            <li>1. Validate battery, payload temp lock, and destination address.</li>
            <li>2. Execute autonomous takeoff with RTK GPS and live route tracking.</li>
            <li>3. Lock landing pad via computer vision and descend precisely.</li>
            <li>4. Trigger OTP release and confirm package drop.</li>
            <li>5. Auto climb and navigate back to base station via RTH.</li>
          </ol>
        </div>
      </div>

      {otpOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
            <div className="text-xl font-black text-[#0a243d]">OTP Payload Release</div>
            <div className="mt-3 text-sm text-slate-600">Enter the one-time code to unlock the medical compartment.</div>
            <input
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300"
            />
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setOtpOpen(false)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
              <button type="button" onClick={() => { setOtpOpen(false); setOtp(''); }} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">Release payload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
