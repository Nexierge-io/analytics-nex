import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DateRange = "today" | "7d" | "30d" | "3m";

// ─── Utilities ────────────────────────────────────────────────────────────────

function jitter(base: number, range = 1) {
  return Math.max(0, base + Math.floor(Math.random() * (range * 2 + 1)) - range);
}

function useAnimatedNumber(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const raf = useRef<number>(0);
  const startRef = useRef<number>(0);
  const fromRef = useRef(target);
  useEffect(() => {
    fromRef.current = display;
    startRef.current = performance.now();
    cancelAnimationFrame(raf.current);
    function tick(now: number) {
      const t = Math.min(1, (now - startRef.current) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(fromRef.current + (target - fromRef.current) * ease));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return display;
}

function LiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-urbanist text-sm font-bold tabular-nums text-foreground">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

function PulseDot({ color = "green" }: { color?: "green" | "amber" | "red" }) {
  const cls = {
    green: "bg-emerald-500 animate-pulse-ring-green",
    amber: "bg-amber-400 animate-pulse-ring-amber",
    red:   "bg-red-500 animate-pulse-ring-red",
  }[color];
  return <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${cls}`} />;
}

// ─── Static mock data ─────────────────────────────────────────────────────────

const ROOM_TYPES = [
  { type: "Premium Suite",   total: 12, occupied: 11, cleaning: 1, pending: 0, revpar: 142 },
  { type: "Standard King",   total: 32, occupied: 26, cleaning: 3, pending: 2, revpar: 89  },
  { type: "Twin Deluxe",     total: 24, occupied: 18, cleaning: 2, pending: 2, revpar: 76  },
  { type: "Single Standard", total: 12, occupied: 7,  cleaning: 0, pending: 0, revpar: 54  },
];
const TOTAL_REVPAR = 94.20;

// Activity data per date range
const ACTIVITY: Record<DateRange, {
  checkins: number; checkinIndividual: number; checkinGroup: number;
  checkouts: number; checkoutIndividual: number; checkoutGroup: number;
  returning: number; returningPct: number;
  netOccupancy: number;
  individual: number; group: number;
  revpar: number; revparVsPrev: number;
  revparByType: Array<{ type: string; revpar: number }>;
}> = {
  today: {
    checkins: 12, checkinIndividual: 10, checkinGroup: 2,
    checkouts: 9, checkoutIndividual: 8, checkoutGroup: 1,
    returning: 3, returningPct: 25,
    netOccupancy: 3,
    individual: 10, group: 2,
    revpar: 94.20, revparVsPrev: 8,
    revparByType: [
      { type: "Premium Suite",   revpar: 142 },
      { type: "Standard King",   revpar: 89  },
      { type: "Twin Deluxe",     revpar: 76  },
      { type: "Single Standard", revpar: 54  },
    ],
  },
  "7d": {
    checkins: 84, checkinIndividual: 72, checkinGroup: 12,
    checkouts: 79, checkoutIndividual: 68, checkoutGroup: 11,
    returning: 21, returningPct: 25,
    netOccupancy: 5,
    individual: 72, group: 12,
    revpar: 91.40, revparVsPrev: 5,
    revparByType: [
      { type: "Premium Suite",   revpar: 138 },
      { type: "Standard King",   revpar: 86  },
      { type: "Twin Deluxe",     revpar: 73  },
      { type: "Single Standard", revpar: 51  },
    ],
  },
  "30d": {
    checkins: 362, checkinIndividual: 308, checkinGroup: 54,
    checkouts: 351, checkoutIndividual: 299, checkoutGroup: 52,
    returning: 94, returningPct: 26,
    netOccupancy: 11,
    individual: 308, group: 54,
    revpar: 88.60, revparVsPrev: -2,
    revparByType: [
      { type: "Premium Suite",   revpar: 131 },
      { type: "Standard King",   revpar: 83  },
      { type: "Twin Deluxe",     revpar: 70  },
      { type: "Single Standard", revpar: 49  },
    ],
  },
  "3m": {
    checkins: 1048, checkinIndividual: 896, checkinGroup: 152,
    checkouts: 1032, checkoutIndividual: 882, checkoutGroup: 150,
    returning: 284, returningPct: 27,
    netOccupancy: 16,
    individual: 896, group: 152,
    revpar: 86.10, revparVsPrev: -5,
    revparByType: [
      { type: "Premium Suite",   revpar: 127 },
      { type: "Standard King",   revpar: 80  },
      { type: "Twin Deluxe",     revpar: 67  },
      { type: "Single Standard", revpar: 46  },
    ],
  },
};

const DATE_RANGE_LABELS: Record<DateRange, string> = {
  today: "Today",
  "7d":  "Last 7 days",
  "30d": "Last 30 days",
  "3m":  "Last 3 months",
};

const LOYALTY_COHORTS = [
  { label: "1 stay",   count: 2847, color: "#6B7280" },
  { label: "2 stays",  count: 834,  color: "#3B82F6" },
  { label: "3 stays",  count: 312,  color: "#A855F7" },
  { label: "4+ stays", count: 204,  color: "#22C55E" },
];
const LOYALTY_MAX = 2847;

const TOP_COUNTRIES = [
  { flag: "🇦🇷", name: "Argentina", count: 1248 },
  { flag: "🇧🇷", name: "Brazil",    count: 876  },
  { flag: "🇺🇸", name: "USA",       count: 643  },
  { flag: "🇨🇱", name: "Chile",     count: 412  },
  { flag: "🇺🇾", name: "Uruguay",   count: 287  },
  { flag: "🇨🇴", name: "Colombia",  count: 198  },
];
const COUNTRY_MAX = 1248;

// ─── Live state hook ──────────────────────────────────────────────────────────

function useLiveRooms() {
  const [inHouse, setInHouse]       = useState(62);
  const [checkedIn, setCheckedIn]   = useState(8);
  const [checkedOut, setCheckedOut] = useState(6);
  const [cleaning, setCleaning]     = useState(6);

  useEffect(() => {
    const id = setInterval(() => {
      setInHouse(v => jitter(v, 1));
      setCheckedIn(v => jitter(v, 1));
      setCheckedOut(v => jitter(v, 1));
      setCleaning(v => jitter(v, 1));
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const occupied = inHouse;
  const vacant   = Math.max(0, 80 - occupied - cleaning);
  const pct      = Math.round((occupied / 80) * 100);

  return { inHouse, checkedIn, checkedOut, cleaning, occupied, vacant, pct };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ icon, title, subtitle, live }: {
  icon?: string; title: string; subtitle: string; live?: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      {live ? <PulseDot color="green" /> : (
        icon && <span className="material-symbols-outlined text-[18px] text-muted-foreground">{icon}</span>
      )}
      <div>
        <h2 className="font-urbanist text-sm font-black uppercase tracking-widest text-foreground">{title}</h2>
        <p className="text-[10px] text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card p-5 flex flex-col ${className}`}>
      {children}
    </div>
  );
}

function DateRangeFilter({ value, onChange }: { value: DateRange; onChange: (v: DateRange) => void }) {
  const ranges: DateRange[] = ["today", "7d", "30d", "3m"];
  return (
    <div className="flex items-center gap-1 rounded-xl bg-secondary p-1">
      {ranges.map(r => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all duration-150 ${
            value === r
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {DATE_RANGE_LABELS[r]}
        </button>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RoomsGuestsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("today");
  const { inHouse, checkedIn, checkedOut, cleaning, occupied, vacant, pct } = useLiveRooms();

  const inHouseDisplay    = useAnimatedNumber(inHouse);
  const checkedInDisplay  = useAnimatedNumber(checkedIn);
  const checkedOutDisplay = useAnimatedNumber(checkedOut);

  const act = ACTIVITY[dateRange];
  const totalBookings = act.individual + act.group;
  const indivPct = Math.round((act.individual / totalBookings) * 100);
  const groupPct = 100 - indivPct;

  const maxRevpar = Math.max(...ROOM_TYPES.map(r => r.revpar));
  const minRevpar = Math.min(...ROOM_TYPES.map(r => r.revpar));
  const highestOccPct = Math.max(...ROOM_TYPES.map(r => r.occupied / r.total));
  const lowestOccPct  = Math.min(...ROOM_TYPES.map(r => r.occupied / r.total));

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">

      {/* ── PAGE HEADER ── */}
      <div className="flex items-start justify-between px-1 pt-1">
        <div>
          <h1 className="font-urbanist text-3xl font-black text-foreground tracking-tight">Guests & Rooms</h1>
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Operational overview · Live + Activity + Lifetime
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PulseDot color="green" />
          <LiveClock />
          <span className="text-[10px] font-bold uppercase text-emerald-500 tracking-wider">Live</span>
        </div>
      </div>

      {/* ── SECTION 1: LIVE ── */}
      <section>
        <SectionLabel live title="Live" subtitle="Right now · Updates every 30s" />

        {/* Hero KPI strip */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-5">

          <Card className="border-l-4 border-emerald-500 stagger-1 animate-fade-in-up">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">In House Right Now</p>
            <span className="font-urbanist text-4xl font-black text-foreground tabular-nums mb-1">{inHouseDisplay}</span>
            <p className="text-[10px] text-muted-foreground mb-3">Guests currently in hotel</p>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                48 individual
              </span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ background: "rgba(168,85,247,0.12)", color: "#A855F7" }}>
                14 group
              </span>
            </div>
          </Card>

          <Card className="stagger-2 animate-fade-in-up">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Room Occupancy</p>
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
                  <circle cx="28" cy="28" r="22" fill="transparent" stroke="hsl(var(--border))" strokeWidth="6" />
                  <circle cx="28" cy="28" r="22" fill="transparent" stroke="#22C55E" strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 22 * pct / 100} ${2 * Math.PI * 22}`}
                    strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-urbanist text-sm font-black text-foreground">{pct}%</span>
                </div>
              </div>
              <div className="space-y-0.5 text-[10px]">
                <p className="font-bold text-emerald-600">{occupied} occupied</p>
                <p className="text-muted-foreground">{vacant} vacant</p>
                <p className={`font-bold ${cleaning > 5 ? "text-amber-500" : "text-muted-foreground"}`}>
                  {cleaning} cleaning{cleaning > 5 ? " ⚠" : ""}
                </p>
                <p className="text-muted-foreground">4 checkout pending</p>
              </div>
            </div>
          </Card>

          <Card className="stagger-3 animate-fade-in-up">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Checking In Today</p>
            <span className="font-urbanist text-4xl font-black text-foreground tabular-nums mb-1">
              {checkedInDisplay + 4}
            </span>
            <div className="mt-auto space-y-1.5">
              <div className="text-[10px]">
                <span className="font-bold text-emerald-500">{checkedInDisplay} done ✓</span>
                <span className="text-muted-foreground"> · 4 pending</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#A855F7" }} />
                <span className="text-[10px] text-muted-foreground">3 returning guests</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[11px]">👥</span>
                <span className="text-[10px] text-muted-foreground">2 groups</span>
              </div>
            </div>
          </Card>

          <Card className="stagger-4 animate-fade-in-up">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Checking Out Today</p>
            <span className="font-urbanist text-4xl font-black text-foreground tabular-nums mb-1">
              {checkedOutDisplay + 3}
            </span>
            <div className="mt-auto space-y-1.5">
              <div className="text-[10px]">
                <span className="font-bold text-emerald-500">{checkedOutDisplay} done ✓</span>
                <span className="text-muted-foreground"> · 3 pending</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold" style={{ color: "#F55A51" }}>1 overdue</span>
                <span className="text-[10px] text-muted-foreground">— Barbara W.</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Occupancy + RevPAR table */}
        <div className="glass-card p-5 animate-fade-in-up stagger-3">
          <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Occupancy by Room Type</h3>
              <p className="mt-0.5 text-[10px] text-muted-foreground">80 rooms total</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[9px] font-bold uppercase text-muted-foreground">Total RevPAR</p>
                <p className="font-urbanist text-xl font-black text-foreground tabular-nums">${TOTAL_REVPAR.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Column headers */}
          <div className="mb-2 grid grid-cols-12 gap-2 px-3 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="col-span-3">Room Type</span>
            <span className="col-span-1 text-center">Total</span>
            <span className="col-span-1 text-center">Occup.</span>
            <span className="col-span-1 text-center">Vacant</span>
            <span className="col-span-1 text-center">Clean</span>
            <span className="col-span-3 text-center">Occupancy %</span>
            <span className="col-span-2 text-right" title="Revenue per available room">RevPAR ⓘ</span>
          </div>

          <div className="space-y-2">
            {ROOM_TYPES.map(rt => {
              const rtPct  = rt.occupied / rt.total;
              const pctNum = Math.round(rtPct * 100);
              const vacantN = rt.total - rt.occupied - rt.cleaning - rt.pending;
              const isTopOcc  = rtPct === highestOccPct;
              const isLowOcc  = rtPct === lowestOccPct;
              const isTopRev  = rt.revpar === maxRevpar;
              const isLowRev  = rt.revpar === minRevpar;
              return (
                <div
                  key={rt.type}
                  className={`grid grid-cols-12 items-center gap-2 rounded-xl px-3 py-2.5 text-xs
                    ${isTopOcc ? "bg-emerald-50/60 dark:bg-emerald-950/20" : ""}
                    ${isLowOcc && !isTopOcc ? "bg-amber-50/60 dark:bg-amber-950/20" : ""}
                    ${!isTopOcc && !isLowOcc ? "bg-secondary/40" : ""}`}
                >
                  <div className="col-span-3 flex items-center gap-1.5 min-w-0">
                    <span className="font-medium text-foreground truncate">{rt.type}</span>
                    {isTopOcc && (
                      <span className="shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 text-[9px] font-black text-emerald-700 dark:text-emerald-400">
                        TOP
                      </span>
                    )}
                    {isLowOcc && !isTopOcc && (
                      <span className="shrink-0 rounded-full bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 text-[9px] font-black text-amber-700 dark:text-amber-400">
                        LOW
                      </span>
                    )}
                  </div>
                  <span className="col-span-1 text-center font-bold tabular-nums text-foreground">{rt.total}</span>
                  <span className="col-span-1 text-center font-bold tabular-nums text-emerald-600">{rt.occupied}</span>
                  <span className="col-span-1 text-center tabular-nums text-muted-foreground">{vacantN}</span>
                  <span className={`col-span-1 text-center font-bold tabular-nums ${rt.cleaning > 0 ? "text-amber-500" : "text-muted-foreground"}`}>
                    {rt.cleaning}
                  </span>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/60">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pctNum}%`,
                          background: isTopOcc ? "#22C55E" : isLowOcc ? "#F59E0B" : "#60A5FA",
                        }} />
                    </div>
                    <span className="w-7 shrink-0 text-right text-[11px] font-black tabular-nums text-foreground">{pctNum}%</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`font-urbanist text-sm font-black tabular-nums ${
                      isTopRev ? "text-emerald-500" : isLowRev ? "text-amber-500" : "text-foreground"
                    }`}>
                      ${rt.revpar}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-2 px-3 text-[10px] text-muted-foreground">
            ⓘ RevPAR = Revenue per available room · Total revenue ÷ total available rooms
          </p>
        </div>
      </section>

      {/* ── SECTION 2: ACTIVITY ── */}
      <section>
        <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
          <SectionLabel icon="bar_chart" title="Activity" subtitle={`Filtered · ${DATE_RANGE_LABELS[dateRange]}`} />
          <DateRangeFilter value={dateRange} onChange={setDateRange} />
        </div>

        {/* Row 1 — 4 cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-5">

          <Card className="stagger-1 animate-fade-in-up">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Check-ins</p>
            <span className="font-urbanist text-4xl font-black text-foreground tabular-nums mb-1">{act.checkins}</span>
            <div className="mt-auto space-y-1">
              <p className="text-[10px] text-muted-foreground">{act.checkinIndividual} individual</p>
              <p className="text-[10px] text-muted-foreground">👥 {act.checkinGroup} group</p>
            </div>
          </Card>

          <Card className="stagger-2 animate-fade-in-up">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Check-outs</p>
            <span className="font-urbanist text-4xl font-black text-foreground tabular-nums mb-1">{act.checkouts}</span>
            <div className="mt-auto space-y-1">
              <p className="text-[10px] text-muted-foreground">{act.checkoutIndividual} individual</p>
              <p className="text-[10px] text-muted-foreground">👥 {act.checkoutGroup} group</p>
            </div>
          </Card>

          <Card className="stagger-3 animate-fade-in-up">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Returning Guests</p>
            <span className="font-urbanist text-4xl font-black tabular-nums mb-1" style={{ color: "#A855F7" }}>
              {act.returning}
            </span>
            <div className="mt-auto">
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ background: "rgba(168,85,247,0.12)", color: "#A855F7" }}>
                {act.returningPct}% of arrivals
              </span>
            </div>
          </Card>

          <Card className="stagger-4 animate-fade-in-up">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Net Occupancy Change</p>
            <span className={`font-urbanist text-4xl font-black tabular-nums mb-1 ${act.netOccupancy >= 0 ? "text-emerald-500" : "text-red-500"}`}>
              {act.netOccupancy >= 0 ? "+" : ""}{act.netOccupancy}
            </span>
            <p className="mt-auto text-[10px] text-muted-foreground">vs previous period</p>
          </Card>
        </div>

        {/* Row 2 — 2 cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-stretch">

          {/* Individual vs Group */}
          <Card className="stagger-2 animate-fade-in-up">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Individual vs Group Bookings</p>
            <div className="mb-4 flex items-end gap-6">
              <div>
                <span className="font-urbanist text-3xl font-black text-foreground tabular-nums">{act.individual}</span>
                <p className="text-[10px] font-bold text-muted-foreground mt-0.5">Individual · {indivPct}%</p>
              </div>
              <div>
                <span className="font-urbanist text-3xl font-black tabular-nums" style={{ color: "#A855F7" }}>{act.group}</span>
                <p className="text-[10px] font-bold text-muted-foreground mt-0.5">Group · {groupPct}%</p>
              </div>
            </div>
            {/* Split bar */}
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              <div className="h-full bg-blue-400 transition-all duration-700" style={{ width: `${indivPct}%` }} />
              <div className="h-full transition-all duration-700" style={{ width: `${groupPct}%`, background: "#A855F7" }} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              <span>Individual</span>
              <span>Group</span>
            </div>
          </Card>

          {/* RevPAR this period */}
          <Card className="stagger-3 animate-fade-in-up">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  RevPAR this period
                </p>
                <p className="text-[10px] text-muted-foreground">Revenue per available room</p>
              </div>
              <div className="text-right">
                <span className="font-urbanist text-3xl font-black text-foreground tabular-nums">${act.revpar.toFixed(2)}</span>
                <div className={`mt-0.5 flex items-center justify-end gap-1 text-[11px] font-bold ${act.revparVsPrev >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  <span>{act.revparVsPrev >= 0 ? "↑" : "↓"}</span>
                  <span>{Math.abs(act.revparVsPrev)}% vs prev</span>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              {act.revparByType.map(r => (
                <div key={r.type} className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-1.5">
                  <span className="text-[11px] text-muted-foreground">{r.type}</span>
                  <span className="font-urbanist text-sm font-black tabular-nums text-foreground">${r.revpar}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ── SECTION 3: LIFETIME ── */}
      <section className="pb-2">
        <SectionLabel icon="history" title="Lifetime" subtitle="All time · Not affected by date filter" />

        {/* Guest Loyalty — full width */}
        <div className="glass-card p-5 mb-5 animate-fade-in-up stagger-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Guest Loyalty</h3>
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">Returning guest rate</span>
              <span className="font-urbanist text-xl font-black text-emerald-600 tabular-nums">47%</span>
            </div>
          </div>
          <div className="space-y-3">
            {LOYALTY_COHORTS.map(c => {
              const w = Math.round((c.count / LOYALTY_MAX) * 100);
              return (
                <div key={c.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                      <span className="text-xs font-medium text-foreground">{c.label}</span>
                    </div>
                    <span className="font-urbanist text-sm font-black tabular-nums text-foreground">
                      {c.count.toLocaleString()} guests
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-border/40">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${w}%`, background: c.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lifetime 3-card row */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 items-stretch">

          {/* Card 1 — Total Guests */}
          <Card className="animate-fade-in-up stagger-2">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Guests</p>
            <span className="font-urbanist text-4xl font-black text-foreground tabular-nums">4,218</span>
            <p className="text-[10px] text-muted-foreground mt-0.5 mb-4">all time</p>
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#A855F7" }} />
                <span className="text-[11px] font-bold tabular-nums" style={{ color: "#A855F7" }}>1,847 returning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                <span className="text-[11px] text-muted-foreground tabular-nums">2,371 first time</span>
              </div>
            </div>
            <div className="mt-auto border-t border-border/60 pt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-emerald-600">WhatsApp verified</span>
                <span className="font-urbanist text-base font-black text-emerald-500 tabular-nums">94.2%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[94%] rounded-full bg-emerald-500 transition-all duration-1000" />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground tabular-nums">3,973 of 4,218 verified</p>
            </div>
          </Card>

          {/* Card 2 — Group vs Individual */}
          <Card className="animate-fade-in-up stagger-3">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Group vs Individual</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl bg-secondary/60 px-3 py-2.5">
                <p className="text-[9px] font-bold uppercase text-muted-foreground mb-1">Group stays</p>
                <span className="font-urbanist text-2xl font-black tabular-nums" style={{ color: "#A855F7" }}>312</span>
              </div>
              <div className="rounded-xl bg-secondary/60 px-3 py-2.5">
                <p className="text-[9px] font-bold uppercase text-muted-foreground mb-1">Individual</p>
                <span className="font-urbanist text-2xl font-black text-foreground tabular-nums">3,906</span>
              </div>
            </div>
            <div className="mt-auto space-y-2">
              <div className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2">
                <span className="text-[11px] text-muted-foreground">Avg rooms per group</span>
                <span className="font-urbanist text-sm font-black tabular-nums text-foreground">4.2</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2">
                <span className="text-[11px] text-muted-foreground">Groups % of total revenue</span>
                <span className="font-urbanist text-sm font-black tabular-nums text-foreground">18%</span>
              </div>
            </div>
          </Card>

          {/* Card 3 — Guest Origin top 6 */}
          <Card className="animate-fade-in-up stagger-4">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Guest Origin</p>
            <p className="mb-3 text-[10px] text-muted-foreground">Top 6 countries</p>
            <div className="space-y-2.5">
              {TOP_COUNTRIES.map(c => {
                const w = Math.round((c.count / COUNTRY_MAX) * 100);
                return (
                  <div key={c.name}>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">{c.flag}</span>
                        <span className="text-xs font-medium text-foreground">{c.name}</span>
                      </div>
                      <span className="text-[11px] font-bold tabular-nums text-foreground">
                        {c.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/40">
                      <div className="h-full rounded-full bg-blue-400 transition-all duration-700"
                        style={{ width: `${w}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>
      </section>

    </div>
  );
}
