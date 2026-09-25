'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'al-haramain-drones';

type DroneRecord = {
  id: string;
  name: string;
  serialNumber: string;
  frameType: string;
  payloadCapacity: string;
  connectivityType: string;
  connectionMode: string;
  port: string;
  baudRate: string;
  cameraUrl: string;
  status: string;
};

const initialRecord = {
  name: '',
  serialNumber: '',
  frameType: 'Hexa',
  payloadCapacity: '4.5 kg',
  connectivityType: 'Wi-Fi / UDP Telemetry',
  connectionMode: 'Wi-Fi / UDP Telemetry Stream',
  port: '14550',
  baudRate: '115200',
  cameraUrl: 'rtsp://192.168.1.10:8554/drone',
};

export function RegisterDroneModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState(initialRecord);
  const [registeredDrones, setRegisteredDrones] = useState<DroneRecord[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRegisteredDrones(JSON.parse(saved) as DroneRecord[]);
      } catch {
        setRegisteredDrones([]);
      }
    }
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const nextDrone: DroneRecord = {
      id: `AH-${Date.now().toString().slice(-6)}`,
      name: form.name || 'Untitled Drone',
      serialNumber: form.serialNumber || `SN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      frameType: form.frameType,
      payloadCapacity: form.payloadCapacity,
      connectivityType: form.connectivityType,
      connectionMode: form.connectionMode,
      port: form.port,
      baudRate: form.baudRate,
      cameraUrl: form.cameraUrl,
      status: 'Connected',
    };

    try {
      const response = await fetch('/api/drones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextDrone),
      });

      if (response.ok) {
        const payload = (await response.json()) as { data?: DroneRecord };
        const persistedDrone = payload.data ?? nextDrone;
        const next = [persistedDrone, ...registeredDrones];
        setRegisteredDrones(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } else {
        const next = [nextDrone, ...registeredDrones];
        setRegisteredDrones(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
    } catch {
      const next = [nextDrone, ...registeredDrones];
      setRegisteredDrones(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }

    setForm(initialRecord);
    setSubmitting(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0d5c9e]">Hardware connectivity</div>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-[#0a243d]">Connect &amp; Register Real Drone</h3>
          </div>
          <button type="button" aria-label="Close modal" onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
          <label className="block text-sm font-medium text-slate-700">
            Drone Name
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300" placeholder="AH-102" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Serial Number
            <input value={form.serialNumber} onChange={(event) => setForm((current) => ({ ...current, serialNumber: event.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300" placeholder="SN-XYZ198" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Frame Type
            <select value={form.frameType} onChange={(event) => setForm((current) => ({ ...current, frameType: event.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300">
              <option>Hexa</option>
              <option>Quad</option>
              <option>Octa</option>
              <option>Fixed-Wing</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Payload Capacity
            <input value={form.payloadCapacity} onChange={(event) => setForm((current) => ({ ...current, payloadCapacity: event.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300" placeholder="4.5 kg" />
          </label>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">
              Connection Type
              <select value={form.connectionMode} onChange={(event) => {
                const nextMode = event.target.value;
                const nextConnectivity =
                  nextMode === 'USB / Serial COM Port' ? 'USB / Serial Port' :
                  nextMode === 'Bluetooth SPP Telemetry Pair' ? 'Bluetooth SPP' :
                  nextMode === 'RTSP / WebRTC Live Camera Feed' ? 'Camera Stream' :
                  'Wi-Fi / UDP Telemetry';

                setForm((current) => ({ ...current, connectionMode: nextMode, connectivityType: nextConnectivity, port: nextMode === 'USB / Serial COM Port' ? 'COM3' : nextMode === 'Bluetooth SPP Telemetry Pair' ? '00:11:22:33:44:55' : current.port }));
              }} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300">
                <option>Wi-Fi / UDP Telemetry Stream</option>
                <option>USB / Serial COM Port</option>
                <option>Bluetooth SPP Telemetry Pair</option>
                <option>RTSP / WebRTC Live Camera Feed</option>
              </select>
            </label>
          </div>

          {form.connectionMode === 'Wi-Fi / UDP Telemetry Stream' && (
            <label className="block text-sm font-medium text-slate-700">
              UDP Port
              <input value={form.port} onChange={(event) => setForm((current) => ({ ...current, port: event.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300" placeholder="14550" />
            </label>
          )}

          {form.connectionMode === 'USB / Serial COM Port' && (
            <label className="block text-sm font-medium text-slate-700">
              Baud Rate
              <select value={form.baudRate} onChange={(event) => setForm((current) => ({ ...current, baudRate: event.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300">
                <option>57600</option>
                <option>115200</option>
                <option>921600</option>
              </select>
            </label>
          )}

          {form.connectionMode === 'RTSP / WebRTC Live Camera Feed' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Camera Stream URL
                <input value={form.cameraUrl} onChange={(event) => setForm((current) => ({ ...current, cameraUrl: event.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-blue-300" placeholder="rtsp://192.168.1.10:8554/drone" />
              </label>
            </div>
          )}

          <div className="md:col-span-2 mt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
            <button type="submit" disabled={submitting} className="rounded-full bg-[#0d5c9e] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-[#0a4f92] disabled:cursor-not-allowed disabled:opacity-70">
              {submitting ? 'Registering…' : 'Connect & Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function getRegisteredDrones(): DroneRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DroneRecord[]) : [];
  } catch {
    return [];
  }
}
