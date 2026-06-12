export interface Zone {
  id: string;
  name: string;
  type: "cage" | "tank";
  abaloneCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface FeedingLog {
  id: string;
  zoneId: string;
  feedType: string;
  amountKg: number;
  fedAt: string;
  memo?: string;
}

const DEFAULT_ZONES: Zone[] = [
  { id: "1", name: "가두리 A", type: "cage", abaloneCount: 2000, isActive: true, createdAt: new Date().toISOString() },
  { id: "2", name: "가두리 B", type: "cage", abaloneCount: 1800, isActive: true, createdAt: new Date().toISOString() },
  { id: "3", name: "가두리 C", type: "cage", abaloneCount: 2200, isActive: true, createdAt: new Date().toISOString() },
  { id: "4", name: "가두리 D", type: "cage", abaloneCount: 1500, isActive: true, createdAt: new Date().toISOString() },
  { id: "5", name: "수조 1", type: "tank", abaloneCount: 800, isActive: true, createdAt: new Date().toISOString() },
  { id: "6", name: "수조 2", type: "tank", abaloneCount: 600, isActive: true, createdAt: new Date().toISOString() },
];

function key(k: string) {
  return `abalone_${k}`;
}

export function getZones(): Zone[] {
  if (typeof window === "undefined") return DEFAULT_ZONES;
  const stored = localStorage.getItem(key("zones"));
  if (!stored) {
    localStorage.setItem(key("zones"), JSON.stringify(DEFAULT_ZONES));
    return DEFAULT_ZONES;
  }
  return JSON.parse(stored);
}

export function saveZone(zone: Zone): void {
  const zones = getZones();
  const idx = zones.findIndex((z) => z.id === zone.id);
  if (idx >= 0) zones[idx] = zone;
  else zones.push(zone);
  localStorage.setItem(key("zones"), JSON.stringify(zones));
}

export function deleteZone(id: string): void {
  const zones = getZones().filter((z) => z.id !== id);
  localStorage.setItem(key("zones"), JSON.stringify(zones));
}

export function getFeedingLogs(): FeedingLog[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(key("feeding_logs"));
  return stored ? JSON.parse(stored) : [];
}

export function saveFeedingLog(log: FeedingLog): void {
  const logs = getFeedingLogs();
  logs.push(log);
  localStorage.setItem(key("feeding_logs"), JSON.stringify(logs));
}

export function getTodayFeedingByZone(zoneId: string): FeedingLog[] {
  const today = new Date().toISOString().split("T")[0];
  return getFeedingLogs().filter(
    (l) => l.zoneId === zoneId && l.fedAt.startsWith(today)
  );
}

export function getDailyAverage(zoneId: string, days: number): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const logs = getFeedingLogs().filter(
    (l) => l.zoneId === zoneId && new Date(l.fedAt) >= cutoff
  );
  if (logs.length === 0) return 0;
  const total = logs.reduce((s, l) => s + l.amountKg, 0);
  return total / days;
}
