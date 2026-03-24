import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Static mock data ─────────────────────────────────────────────────────────

const DEPT_BASE = [
  {
    icon: "restaurant", name: "Room Service",
    pending: 8, delayed: 1, total: 12,
    bgIdle: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-500",
    segments: [
      { color: "bg-amber-400", w: 25 },
      { color: "bg-blue-400",  w: 50 },
      { color: "bg-orange-400",w: 17 },
      { color: "bg-red-500",   w: 8  },
    ],
  },
  {
    icon: "cleaning_services", name: "Housekeeping",
    pending: 12, delayed: 6, total: 18,
    bgIdle: "bg-amber-50 dark:bg-amber-950/30", iconColor: "text-amber-500",
    badge: "WORST PERFORMER",
    segments: [
      { color: "bg-amber-400", w: 30 },
      { color: "bg-blue-400",  w: 37 },
      { color: "bg-orange-400",w: 0  },
      { color: "bg-red-500",   w: 33 },
    ],
  },
  {
    icon: "concierge", name: "Front Desk",
    pending: 7, delayed: 1, total: 8,
    bgIdle: "bg-zinc-50 dark:bg-zinc-800/40", iconColor: "text-zinc-500",
    segments: [
      { color: "bg-amber-400", w: 12 },
      { color: "bg-blue-400",  w: 75 },
      { color: "bg-orange-400",w: 0  },
      { color: "bg-red-500",   w: 13 },
    ],
  },
  {
    icon: "build", name: "Maintenance",
    pending: 4, delayed: 0, total: 4,
    bgIdle: "bg-zinc-50 dark:bg-zinc-800/40", iconColor: "text-zinc-500",
    segments: [
      { color: "bg-amber-400", w: 25 },
      { color: "bg-blue-400",  w: 75 },
      { color: "bg-orange-400",w: 0  },
      { color: "bg-red-500",   w: 0  },
    ],
  },
];

const BAR_LEGEND = [
  { color: "bg-amber-400",  label: "NEW"         },
  { color: "bg-blue-400",   label: "IN PROGRESS" },
  { color: "bg-orange-400", label: "ON HOLD"     },
  { color: "bg-red-500",    label: "OVERDUE"     },
];

// Fix 2: simplified arrivals/departures — stage avatar, room type, clean status
type GuestStage = "pre_arrival" | "in_stay" | "post_stay" | "past_guest" | "lead" | "unknown";

const ARRIVALS_BASE = [
  { initials: "SM", name: "Sarah Miller",  roomType: "Standard King",   eta: "ETA 12:45",  checkedIn: false, arrivingNow: false, returning: false, group: null as number | null, stage: "pre_arrival" as GuestStage },
  { initials: "JL", name: "James Leong",   roomType: "Twin Deluxe",     eta: "12:30",      checkedIn: true,  arrivingNow: false, returning: false, group: null,                  stage: "in_stay"     as GuestStage },
  { initials: "RK", name: "Robert K.",     roomType: "Penthouse Suite",  eta: "",           checkedIn: false, arrivingNow: true,  returning: true,  group: null,                  stage: "past_guest"  as GuestStage },
  { initials: "AC", name: "Aria Chen",     roomType: "Premium Suite",   eta: "ETA 14:00",  checkedIn: false, arrivingNow: false, returning: false, group: null,                  stage: "pre_arrival" as GuestStage },
  { initials: "JG", name: "Johnson Group", roomType: "Standard King",   eta: "ETA 13:30",  checkedIn: false, arrivingNow: false, returning: false, group: 3,                     stage: "pre_arrival" as GuestStage },
];

const DEPARTURES_BASE = [
  { initials: "BW", name: "Barbara Wilson", roomType: "Standard King",  eta: "Due 11:00",  checkedIn: true,  arrivingNow: false, returning: false, group: null as number | null, stage: "in_stay"    as GuestStage },
  { initials: "DM", name: "David Moreno",   roomType: "Twin Deluxe",    eta: "Checked Out",checkedIn: false, arrivingNow: false, returning: false, group: null,                  stage: "post_stay"  as GuestStage },
  { initials: "YK", name: "Yuki Kobayashi", roomType: "Premium Suite",  eta: "Due 12:00",  checkedIn: false, arrivingNow: false, returning: true,  group: null,                  stage: "in_stay"    as GuestStage },
  { initials: "LF", name: "Lena Fischer",   roomType: "Standard King",  eta: "Due 12:00",  checkedIn: false, arrivingNow: false, returning: false, group: null,                  stage: "in_stay"    as GuestStage },
  { initials: "GP", name: "George Park",    roomType: "Junior Suite",   eta: "Extended",   checkedIn: false, arrivingNow: false, returning: true,  group: null,                  stage: "past_guest" as GuestStage },
];

// Contact category → avatar color
type ContactCategory = "unknown" | "lead" | "pre_arrival" | "in_stay" | "post_stay" | "past_guest";
const CATEGORY_AVATAR: Record<ContactCategory, string> = {
  unknown:    "#6B6560",
  lead:       "#3B82F6",
  pre_arrival:"#F59E0B",
  in_stay:    "#22C55E",
  post_stay:  "#F97316",
  past_guest: "#A855F7",
};
const CATEGORY_LABEL: Record<ContactCategory, string> = {
  unknown:    "Unknown",
  lead:       "Lead",
  pre_arrival:"Pre-Arrival",
  in_stay:    "In-Stay",
  post_stay:  "Post-Stay",
  past_guest: "Past Guest",
};

const CONVO_POOL: Array<{
  initials: string; name: string; room: string; preview: string;
  urgent: boolean; category: ContactCategory;
}> = [
  { initials: "JS", name: "Jordan Smith", room: "204", preview: "Extra towels please, we need 4 more...",  urgent: true,  category: "in_stay"    },
  { initials: "MA", name: "Maria Alva",   room: "105", preview: "When is checkout tomorrow exactly?",     urgent: false, category: "in_stay"    },
  { initials: "KL", name: "Kevin Lee",    room: "312", preview: "The minibar is empty, can you restock?", urgent: false, category: "in_stay"    },
  { initials: "PR", name: "Priya Rao",    room: "501", preview: "Can we get a late checkout until 2pm?",  urgent: false, category: "post_stay"  },
  { initials: "HG", name: "Hugo Garza",   room: "220", preview: "AC is not working properly in room",     urgent: true,  category: "pre_arrival"},
  { initials: "SB", name: "Sophie Bell",  room: "415", preview: "Requesting a wake-up call at 6am",       urgent: false, category: "past_guest" },
  { initials: "OT", name: "Oliver Tang",  room: "317", preview: "Is the rooftop pool open tonight?",      urgent: false, category: "lead"       },
  { initials: "NR", name: "Nina Rossi",   room: "109", preview: "Need a taxi to airport for 8am please",  urgent: false, category: "unknown"    },
];

const CONVO_LEGEND: Array<{ category: ContactCategory }> = [
  { category: "unknown"    },
  { category: "lead"       },
  { category: "pre_arrival"},
  { category: "in_stay"    },
  { category: "post_stay"  },
  { category: "past_guest" },
];

const QUICK_ACTIONS = [
  { icon: "local_activity", label: "Create Ticket",  path: "/tickets-requests"  },
  { icon: "person_add",     label: "Create Contact", path: "/communication-hub" },
  { icon: "event",          label: "Create Booking", path: "/rooms-guests"      },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

function jitter(base: number, range = 2) {
  return Math.max(0, base + Math.floor(Math.random() * (range * 2 + 1)) - range);
}

function fmtAgo(seconds: number) {
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

// ─── Animated number hook ─────────────────────────────────────────────────────

function useAnimatedNumber(target: number, duration = 700) {
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

// ─── Live tickets state hook ──────────────────────────────────────────────────

type DeptState = typeof DEPT_BASE[0] & { pending: number; delayed: number; total: number };

function useLiveTickets() {
  const [depts, setDepts] = useState<DeptState[]>(DEPT_BASE.map(d => ({ ...d })));
  const [newCount, setNewCount] = useState(8);
  const [inProgressCount, setInProgressCount] = useState(18);

  useEffect(() => {
    const id = setInterval(() => {
      setDepts(prev => prev.map(d => ({
        ...d,
        pending: jitter(d.pending, 1),
        delayed: jitter(d.delayed, 1),
        total:   jitter(d.total,   1),
      })));
      setNewCount(v => jitter(v, 1));
      setInProgressCount(v => jitter(v, 1));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const totalActive = depts.reduce((s, d) => s + d.total, 0);
  return { depts, totalActive, newCount, inProgressCount };
}

// ─── Live conversations hook ──────────────────────────────────────────────────

type ConvoEntry = {
  id: number;
  initials: string;
  name: string;
  room: string;
  preview: string;
  urgent: boolean;
  unread: number;
  age: number;
  category: ContactCategory;
};

function useLiveConversations() {
  const nextId = useRef(100);
  const [convos, setConvos] = useState<ConvoEntry[]>(() =>
    CONVO_POOL.slice(0, 4).map((c, i) => ({
      ...c, id: i,
      unread: c.urgent ? 1 : 0,
      age: [120, 840, 1320, 1860][i],
    }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setConvos(prev => prev.map(c => ({ ...c, age: c.age + 1 })));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function schedule() {
      const delay = 12000 + Math.random() * 6000;
      return setTimeout(() => {
        setConvos(prev => {
          if (Math.random() < 0.6) {
            const idx = Math.floor(Math.random() * prev.length);
            const updated = prev.map((c, i) =>
              i === idx ? { ...c, age: 0, unread: c.unread + (Math.random() > 0.4 ? 1 : 0), urgent: Math.random() > 0.7 } : c
            );
            const bumped = updated.splice(idx, 1)[0];
            return [bumped, ...updated];
          } else {
            const existing = new Set(prev.map(c => c.name));
            const fresh = CONVO_POOL.filter(c => !existing.has(c.name));
            if (fresh.length === 0) return prev;
            const pick = fresh[Math.floor(Math.random() * fresh.length)];
            return [{ ...pick, id: nextId.current++, unread: pick.urgent ? 2 : 1, age: 0 }, ...prev].slice(0, 5);
          }
        });
        idRef.current = schedule();
      }, delay);
    }
    const idRef = { current: schedule() };
    return () => clearTimeout(idRef.current);
  }, []);

  const attentionCount = convos.filter(c => c.unread > 0).length;
  return { convos, attentionCount };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiStrip({ accentClass, onClick, children }: { accentClass?: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <div className={`glass-card relative overflow-hidden flex flex-col justify-between p-5 ${accentClass || ""}`} onClick={onClick}>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
      {children}
    </div>
  );
}

function PulseDot({ color }: { color: "red" | "green" | "amber" }) {
  const cls = {
    red:   "bg-red-500 animate-pulse-ring-red",
    green: "bg-emerald-500 animate-pulse-ring-green",
    amber: "bg-amber-400 animate-pulse-ring-amber",
  }[color];
  return <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${cls}`} />;
}

function LiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  return (
    <span className="font-urbanist text-sm font-bold text-foreground tabular-nums">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

function OccupancyDonut({ pct }: { pct: number }) {
  const r = 90;
  const circ = 2 * Math.PI * r;
  const segs = [
    { color: "#F55A51", dash: circ * 0.42, offset: 0 },
    { color: "#60A5FA", dash: circ * 0.21, offset: -(circ * 0.42) },
    { color: "#FBBF24", dash: circ * 0.15, offset: -(circ * 0.63) },
  ];
  return (
    <div className="relative h-52 w-52 mx-auto">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="transparent" stroke="hsl(var(--border))" strokeWidth="20" />
        {segs.map((s, i) => (
          <circle key={i} cx="100" cy="100" r={r} fill="transparent" stroke={s.color} strokeWidth="20"
            strokeDasharray={`${s.dash} ${circ - s.dash}`} strokeDashoffset={s.offset} strokeLinecap="round"
            className="animate-fade-in" style={{ animationDelay: `${0.3 + i * 0.15}s` }} />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-urbanist text-4xl font-black text-foreground tabular-nums">{pct}%</span>
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Occupied</span>
      </div>
    </div>
  );
}

function DeptRow({ dept, delay }: { dept: DeptState; delay: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), delay); return () => clearTimeout(t); }, [delay]);
  const pending = useAnimatedNumber(dept.pending);
  const delayed = useAnimatedNumber(dept.delayed);
  const total   = useAnimatedNumber(dept.total);

  return (
    <div className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${dept.bgIdle}`}>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/60 dark:bg-black/20 ${dept.iconColor}`}>
        <span className="material-symbols-outlined text-[18px]">{dept.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="mb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-bold text-foreground truncate">{dept.name}</span>
            {dept.badge && (
              <span className="shrink-0 rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-black uppercase text-white">{dept.badge}</span>
            )}
          </div>
          <span className="ml-2 shrink-0 text-[10px] font-bold uppercase text-muted-foreground tabular-nums">{total} total</span>
        </div>
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
          {dept.segments.map((seg, i) => (
            seg.w > 0 && (
              <div key={i} className={`h-full ${seg.color} transition-all duration-700`}
                style={{ width: mounted ? `${seg.w}%` : "0%", transitionDelay: `${0.06 * i}s` }} />
            )
          ))}
        </div>
      </div>
      <div className="flex gap-3 shrink-0">
        <div className="text-center">
          <p className="text-[9px] font-bold uppercase text-muted-foreground">Waiting</p>
          <p className="font-urbanist text-sm font-bold text-foreground tabular-nums">{pending}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-bold uppercase text-muted-foreground">Overdue</p>
          <p className={`font-urbanist text-sm font-bold tabular-nums ${delayed > 0 ? "text-red-500" : "text-muted-foreground"}`}>{delayed}</p>
        </div>
      </div>
    </div>
  );
}

type GuestEntry = typeof ARRIVALS_BASE[0];

// Stage → avatar background color (reuses ContactCategory palette)
const STAGE_COLOR: Record<GuestStage, string> = {
  pre_arrival: "#F59E0B",
  in_stay:     "#22C55E",
  post_stay:   "#F97316",
  past_guest:  "#A855F7",
  lead:        "#3B82F6",
  unknown:     "#6B6560",
};

function GuestRow({ g, isDeparture }: { g: GuestEntry; isDeparture?: boolean }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  // Derive status label
  let statusLabel: React.ReactNode;
  if (g.arrivingNow) {
    statusLabel = (
      <div className="flex items-center gap-1.5">
        <PulseDot color="green" />
        <span className="text-[10px] font-bold uppercase text-emerald-500">Arriving Now</span>
      </div>
    );
  } else if (isDeparture) {
    statusLabel = g.checkedIn ? (
      <span className="text-[10px] font-bold text-red-500">Late checkout</span>
    ) : g.eta === "Checked Out" ? (
      <span className="text-[10px] font-bold text-emerald-500">✓ Checked Out</span>
    ) : (
      <span className="text-[10px] font-bold text-muted-foreground">Pending</span>
    );
  } else {
    statusLabel = g.checkedIn ? (
      <span className="text-[10px] font-bold text-emerald-500">✓ Checked In</span>
    ) : (
      <span className="text-[10px] font-bold text-muted-foreground">Pending</span>
    );
  }

  return (
    <div
      className={`group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary/60
        ${g.arrivingNow ? "border-l-4 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white font-urbanist"
          style={{ background: STAGE_COLOR[g.stage] }}
        >
          {g.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-xs font-bold text-foreground truncate">{g.name}</p>
            {g.returning && (
              <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                style={{ background: "rgba(168,85,247,0.12)", color: "#A855F7" }}>
                ↩ Returning
              </span>
            )}
            {g.group && (
              <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                👥 Group · {g.group} rooms
              </span>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground">{g.roomType}</span>
        </div>
      </div>
      <div className="shrink-0 ml-2 relative">
        <div className={`text-right transition-opacity duration-150 ${hovered ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          {g.eta && g.eta !== "Checked Out" && (
            <p className="text-[10px] font-bold uppercase text-muted-foreground">{g.eta}</p>
          )}
          {statusLabel}
        </div>
        <div className={`absolute inset-y-0 right-0 flex items-center gap-1 transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <button onClick={() => navigate("/communication-hub")} title="Open conversation"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 transition-colors">
            <span className="material-symbols-outlined text-[15px]">chat</span>
          </button>
          <button onClick={() => navigate("/rooms-guests")} title="View room"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors">
            <span className="material-symbols-outlined text-[15px]">bed</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Quick Actions dropdown button ────────────────────────────────────────────

function QuickActionsMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 rounded-xl bg-secondary border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-all hover:bg-secondary/80 active:scale-[0.97]"
      >
        <span className="material-symbols-outlined text-[16px]">bolt</span>
        Quick Actions
        <span className={`material-symbols-outlined text-[14px] transition-transform duration-150 ${open ? "rotate-180" : ""}`}>expand_more</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 animate-fade-in rounded-2xl border border-border bg-card p-1.5 shadow-xl">
          {QUICK_ACTIONS.map(action => (
            <button
              key={action.label}
              onClick={() => { navigate(action.path); setOpen(false); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span className="material-symbols-outlined text-[18px] text-muted-foreground">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function MainDashboardPage() {
  const navigate = useNavigate();
  const [movementTab, setMovementTab] = useState<"arrivals" | "departures">("arrivals");
  const { depts, totalActive, newCount, inProgressCount } = useLiveTickets();
  const { convos, attentionCount } = useLiveConversations();

  const ticketsDisplay = useAnimatedNumber(totalActive, 600);
  const convoDisplay   = useAnimatedNumber(convos.length + 19, 600);

  const guestList = movementTab === "arrivals" ? ARRIVALS_BASE : DEPARTURES_BASE;
  const hasAlerts = attentionCount > 0;

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up">

      {/* Greeting */}
      <div className="flex items-start justify-between px-1 pt-1">
        <div>
          <h1 className="font-urbanist text-3xl font-black text-foreground tracking-tight">
            Good morning, Daniel 👋
          </h1>
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Operational Lead · General Management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <QuickActionsMenu />
          <div className="text-right">
            <p className="text-sm font-semibold text-muted-foreground">Today's Overview · Monday, March 23</p>
            <p className={`mt-1 text-[11px] font-bold ${hasAlerts ? "text-amber-500" : "text-emerald-600"}`}>
              {hasAlerts
                ? `⚠ ${attentionCount} item${attentionCount > 1 ? "s" : ""} need your attention`
                : "✓ All operations running smoothly"}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

        <KpiStrip accentClass="border-l-4 border-emerald-500 stagger-1 animate-fade-in-up cursor-pointer hover:ring-1 hover:ring-accent/30 transition-shadow" onClick={() => navigate("/tickets-requests")}>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Today's Revenue</p>
            <h2 className="font-urbanist text-4xl font-black text-foreground tabular-nums">$2,840</h2>
          </div>
          <div className="mt-3 flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
            </span>
            <p className="text-[11px] text-muted-foreground">18 orders · Room Service</p>
          </div>
        </KpiStrip>

        <KpiStrip accentClass="stagger-2 animate-fade-in-up cursor-pointer hover:ring-1 hover:ring-accent/30 transition-shadow" onClick={() => navigate("/rooms-guests")}>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Today's Occupancy</p>
            <h2 className="font-urbanist text-4xl font-black text-foreground">78%</h2>
          </div>
          <div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-accent to-emerald-500 transition-all duration-1000" />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">62 / 80 rooms occupied</p>
          </div>
        </KpiStrip>

        <KpiStrip accentClass="border-l-4 border-amber-400 stagger-3 animate-fade-in-up cursor-pointer hover:ring-1 hover:ring-accent/30 transition-shadow" onClick={() => navigate("/tickets-requests")}>
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Now</p>
              <h2 className="font-urbanist text-4xl font-black text-foreground tabular-nums">{ticketsDisplay}</h2>
              <p className="text-[10px] text-muted-foreground">open tickets</p>
            </div>
            <PulseDot color="amber" />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
              {inProgressCount} IN PROGRESS
            </span>
          </div>
        </KpiStrip>

        <KpiStrip accentClass="stagger-4 animate-fade-in-up cursor-pointer hover:ring-1 hover:ring-accent/30 transition-shadow" onClick={() => navigate("/rooms-guests")}>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Today's Movement</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-foreground">12 Check-ins</span>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-emerald-600">8 Arrived</span>
                  <span className="text-[10px] text-muted-foreground">4 Pending</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pl-0.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#A855F7" }} />
                <span className="text-[10px] text-muted-foreground">3 returning guests</span>
              </div>
              <div className="h-px w-full bg-border/60" />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-foreground">9 Check-outs</span>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-muted-foreground">6 Done</span>
                  <span className="text-[10px] text-muted-foreground">3 Pending</span>
                </div>
              </div>
            </div>
          </div>
        </KpiStrip>

        <KpiStrip accentClass="border-l-4 border-blue-500 stagger-5 animate-fade-in-up cursor-pointer hover:ring-1 hover:ring-accent/30 transition-shadow" onClick={() => navigate("/communication-hub")}>
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Live Conversations</p>
              <h2 className="font-urbanist text-4xl font-black text-foreground tabular-nums">{convoDisplay}</h2>
            </div>
            <span className="material-symbols-outlined text-blue-400">forum</span>
          </div>
          <div className="mt-2">
            {attentionCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-black text-white animate-pulse-ring-red">
                {attentionCount} ATTENTION
              </span>
            ) : (
              <span className="text-[10px] text-muted-foreground">All clear</span>
            )}
          </div>
        </KpiStrip>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-5">

        {/* LEFT col — flex-col so Arrivals card can fill remaining height */}
        <div className="col-span-12 flex flex-col gap-5 lg:col-span-4" style={{ minHeight: 0 }}>

          {/* Occupancy donut */}
          <div className="glass-card flex flex-col items-center p-8 animate-scale-in stagger-3">
            <OccupancyDonut pct={78} />
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2.5">
              {[
                { color: "bg-[#F55A51]",                label: "Premium Suites" },
                { color: "bg-blue-400",                  label: "Standard King"  },
                { color: "bg-amber-400",                 label: "Twin Deluxe"    },
                { color: "bg-zinc-300 dark:bg-zinc-600", label: "Maintenance"    },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                  <span className="text-xs font-semibold text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-1.5">
              <PulseDot color="green" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Live · Updated just now</span>
            </div>
          </div>

          {/* Arrivals / Departures — flex-1 to fill remaining left-col height */}
          <div className="glass-card flex flex-col overflow-hidden animate-slide-in-left stagger-4 flex-1">
            <div className="flex shrink-0 border-b border-border/60">
              <button
                onClick={() => setMovementTab("arrivals")}
                className={`flex-1 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  movementTab === "arrivals" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Arrivals ({ARRIVALS_BASE.length})
              </button>
              <button
                onClick={() => setMovementTab("departures")}
                className={`flex-1 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  movementTab === "departures" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Departures ({DEPARTURES_BASE.length})
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                {guestList.map(g => <GuestRow key={g.name} g={g} isDeparture={movementTab === "departures"} />)}
              </div>
            </div>
            <div className="shrink-0 border-t border-border/60 px-4 py-2.5">
              <button onClick={() => navigate("/rooms-guests")}
                className="text-[10px] font-bold uppercase tracking-wider text-accent hover:underline">
                View all {movementTab === "arrivals" ? "arrivals" : "departures"} →
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT col */}
        <div className="col-span-12 flex flex-col gap-5 lg:col-span-8">

          {/* Live tickets by department */}
          <div className="glass-card p-7 animate-fade-in-up stagger-3">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <PulseDot color="green" />
                <h3 className="font-urbanist text-sm font-bold uppercase tracking-widest text-foreground">
                  Live Tickets by Department
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <LiveClock />
                <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase text-muted-foreground">
                  Oldest open: 23 min
                </span>
                <button
                  onClick={() => navigate("/tickets-requests")}
                  className="flex items-center gap-1 rounded-lg bg-secondary border border-border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-foreground transition-all hover:bg-secondary/80 active:scale-95"
                >
                  View all →
                </button>
              </div>
            </div>
            <div className="mb-4 flex items-center gap-4 flex-wrap">
              {BAR_LEGEND.map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className={`h-2 w-4 rounded-full ${l.color}`} />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {depts.map((dept, i) => (
                <DeptRow key={dept.name} dept={dept} delay={200 + i * 100} />
              ))}
            </div>
          </div>

          {/* Bottom row: Conversations (60%) + Widget/Contacts stacked (40%) */}
          <div className="grid gap-5 items-stretch" style={{ gridTemplateColumns: "3fr 2fr" }}>

            {/* Live Conversations — full height, up to 10 rows */}
            <div className="glass-card flex flex-col overflow-hidden animate-slide-in-left stagger-5">
              <div className="flex shrink-0 items-start justify-between border-b border-border/60 px-5 py-3.5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Live Conversations</h3>
                    <PulseDot color="green" />
                  </div>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">Latest · Sorted by most recent</p>
                </div>
                <a href="/communication-hub" className="shrink-0 text-[10px] font-bold uppercase text-accent hover:underline mt-0.5">
                  Open inbox →
                </a>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                  {convos.map(c => (
                    <div
                      key={c.id}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-secondary/60 cursor-pointer
                        ${c.urgent ? "border-l-4 border-red-500 bg-secondary/40" : ""}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0">
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white font-urbanist"
                            style={{ background: CATEGORY_AVATAR[c.category] }}
                          >
                            {c.initials}
                          </div>
                          {c.urgent && (
                            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card bg-emerald-500">
                              <span className="material-symbols-outlined text-[8px] text-white">chat</span>
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">
                            {c.name} <span className="font-normal text-muted-foreground">({c.room})</span>
                          </p>
                          <p className="w-32 truncate text-[11px] text-muted-foreground">{c.preview}</p>
                        </div>
                      </div>
                      <div className="shrink-0 ml-2 text-right">
                        <p className="text-[9px] font-bold uppercase text-muted-foreground tabular-nums">{fmtAgo(c.age)}</p>
                        {c.unread > 0 && (
                          <span className="mt-1 inline-block rounded bg-red-500 px-1.5 py-0.5 text-[9px] font-black text-white">
                            {c.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 border-t border-border/60 px-4 py-2.5">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {CONVO_LEGEND.map(l => (
                    <div key={l.category} className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: CATEGORY_AVATAR[l.category] }} />
                      <span className="text-[10px] text-muted-foreground">{CATEGORY_LABEL[l.category]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: Widget + Contacts stacked, equal halves */}
            <div className="flex flex-col gap-5">

              {/* Web Widget · Today */}
              <div className="glass-card flex flex-col flex-1 p-5 animate-fade-in-up stagger-5">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Web Widget · Today</h4>
                  </div>
                  <PulseDot color="green" />
                </div>
                <div className="mb-2">
                  <span className="font-urbanist text-3xl font-black text-foreground tabular-nums">47</span>
                  <span className="ml-2 text-[10px] font-bold uppercase text-muted-foreground">sessions</span>
                </div>
                <div className="space-y-1.5 mb-2">
                  <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-1.5">
                    <span className="text-[11px] text-muted-foreground">💬 Started conversation</span>
                    <span className="font-urbanist text-sm font-black text-foreground tabular-nums">12</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-1.5">
                    <span className="text-[11px] text-muted-foreground">✅ Converted</span>
                    <div>
                      <span className="font-urbanist text-sm font-black text-foreground tabular-nums">3</span>
                      <span className="ml-1.5 text-[10px] font-bold text-emerald-500">6.4%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <a href="/communication-hub" className="text-[10px] font-bold uppercase hover:underline" style={{ color: "#F55A51" }}>
                    View analytics →
                  </a>
                </div>
              </div>

              {/* New Contacts · Today */}
              <div className="glass-card flex flex-col flex-1 p-5 animate-fade-in-up stagger-6">
                <div className="mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">New Contacts · Today</h4>
                </div>
                <div className="mb-2">
                  <span className="font-urbanist text-3xl font-black text-foreground tabular-nums">24</span>
                  <span className="ml-2 text-[10px] font-bold uppercase text-muted-foreground">new today</span>
                </div>
                <div className="mb-2 space-y-1.5">
                  <div className="flex items-center justify-between rounded-lg px-3 py-1.5"
                    style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
                    <span className="text-[11px] font-medium text-blue-500">📱 WhatsApp</span>
                    <span className="font-urbanist text-sm font-black text-foreground tabular-nums">18</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg px-3 py-1.5"
                    style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.15)" }}>
                    <span className="text-[11px] font-medium text-teal-500">🌐 Widget</span>
                    <span className="font-urbanist text-sm font-black text-foreground tabular-nums">6</span>
                  </div>
                </div>
                <div className="mb-2 rounded-lg px-3 py-1.5"
                  style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <span className="text-[11px] font-bold" style={{ color: "#F59E0B" }}>
                    → 8 moved from Unknown to Lead
                  </span>
                </div>
                <div className="space-y-1 mb-2">
                  {([
                    { color: "#F59E0B", label: "Pre-Arrival", count: 8  },
                    { color: "#22C55E", label: "In-Stay",     count: 10 },
                    { color: "#F97316", label: "Post-Stay",   count: 6  },
                  ] as const).map(row => (
                    <div key={row.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: row.color }} />
                        <span className="text-[11px] text-muted-foreground">{row.label}</span>
                      </div>
                      <span className="text-[11px] font-bold tabular-nums text-foreground">{row.count}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <a href="/communication-hub" className="text-[10px] font-bold uppercase hover:underline" style={{ color: "#F55A51" }}>
                    View all contacts →
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
