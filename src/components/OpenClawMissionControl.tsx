"use client";

import { useMemo, useState, useCallback, useEffect, type ReactNode } from "react";

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */

interface Section {
  title: string;
  icon: string;
  description: string;
  items: string[];
}

interface StatCard {
  label: string;
  value: string | number;
  trend?: string;
  color: string;
}

interface Experiment {
  id: string;
  target: string;
  hypothesis: string;
  status: "Keep" | "Queued" | "Testing" | "Rejected";
  progress: number;
}

interface TestCase {
  task: string;
  expected: string;
  status: "Pass" | "Fail" | "Pending";
}

interface ActivityEntry {
  time: string;
  event: string;
  detail: string;
  type: "success" | "info" | "next";
}

/* ────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */

const SECTIONS: Section[] = [
  {
    title: "Core",
    icon: "\u2699",
    description: "Global rules and execution discipline.",
    items: ["agent_identity.md", "routing_rules.md", "file_loading_rules.md", "executor_rules.md"],
  },
  {
    title: "Router",
    icon: "\u2194",
    description: "Indexes and request classification.",
    items: ["route_request.md", "skill_index.md", "workflow_index.md"],
  },
  {
    title: "Skills",
    icon: "\u26A1",
    description: "Narrow procedural capabilities.",
    items: [
      "summarize_video.md",
      "repo_analysis.md",
      "memory_update.md",
      "log_experiment.md",
      "design_skill.md",
      "evaluate_skill.md",
      "route_debug.md",
      "context_trim.md",
      "skill_gap_analysis.md",
      "workflow_review.md",
    ],
  },
  {
    title: "Workflows",
    icon: "\u21BB",
    description: "Multi-step playbooks and compression loops.",
    items: [
      "autoresearch_loop.md",
      "analyze_video_for_architecture.md",
      "build_new_skill.md",
      "daily_memory_compression.md",
    ],
  },
  {
    title: "Memory",
    icon: "\uD83E\uDDE0",
    description: "Durable notes, focus, and experiment history.",
    items: [
      "research_notes.md",
      "decisions.md",
      "experiment_log.md",
      "current_focus.md",
      "routing_notes.md",
    ],
  },
  {
    title: "Targets",
    icon: "\uD83C\uDFAF",
    description: "Autoresearch constraints and evaluation.",
    items: ["skill_to_improve.md", "eval_rubric.md", "allowed_files.md"],
  },
];

const STAT_CARDS: StatCard[] = [
  { label: "Skills", value: 10, trend: "+2 this week", color: "cyan" },
  { label: "Workflows", value: 4, trend: "Stable", color: "mint" },
  { label: "Memory Files", value: 5, trend: "+1 today", color: "purple" },
  { label: "Active Target", value: "repo_analysis", color: "orange" },
];

const EXPERIMENTS: Experiment[] = [
  {
    id: "001",
    target: "repo_analysis.md",
    hypothesis: "Explicit triggers and outputs increase reusability.",
    status: "Keep",
    progress: 100,
  },
  {
    id: "002",
    target: "routing layer",
    hypothesis: "Route debug should catch workflow overreach before execution.",
    status: "Queued",
    progress: 15,
  },
  {
    id: "003",
    target: "context_trim.md",
    hypothesis: "Aggressive trimming before executor improves output quality.",
    status: "Testing",
    progress: 60,
  },
];

const TEST_CASES: TestCase[] = [
  {
    task: "Analyze Karpathy\u2019s autoresearch repo and tell me what we should adapt.",
    expected: "repo_analysis",
    status: "Pass",
  },
  {
    task: "Summarize this OpenClaw tutorial video and tell me if it matters for our build.",
    expected: "summarize_video",
    status: "Pass",
  },
  {
    task: "Improve the repo_analysis skill using our rubric.",
    expected: "autoresearch_loop",
    status: "Pending",
  },
  {
    task: "What skills are we missing for the current roadmap?",
    expected: "skill_gap_analysis",
    status: "Pass",
  },
];

const FOCUS = {
  mission: "Build a stable markdown brain for local OpenClaw on the M1 Mac mini.",
  priorities: [
    "Harden router and executor split",
    "Keep context lean with daily compression",
    "Expand skill library without overlap",
    "Prepare Mission Control for live file reads",
  ],
};

const SYSTEM_FLOW = [
  { step: "1", label: "Router reads indexes only", accent: "cyan" },
  { step: "2", label: "Context Trim cuts useless load", accent: "orange" },
  { step: "3", label: "Executor loads selected skills / workflows", accent: "mint" },
  { step: "4", label: "Memory updates preserve durable signal", accent: "purple" },
  { step: "5", label: "Autoresearch improves one target at a time", accent: "gold" },
] as const;

const MEMORY_SNAPSHOT = [
  "Routing should remain separate from execution.",
  "Filesystem memory is more stable than long chat context.",
  "Autoresearch must target one file at a time.",
];

const ACTIVITY: ActivityEntry[] = [
  {
    time: "Today",
    event: "Architecture scaffold created",
    detail: "Router, skills, workflows, memory, and targets initialized.",
    type: "success",
  },
  {
    time: "Today",
    event: "Repo analysis refined",
    detail: "Triggers and output format made more explicit for autoresearch.",
    type: "info",
  },
  {
    time: "Next",
    event: "Mission Control integration",
    detail: "Connect UI panels to live markdown files and routing tests.",
    type: "next",
  },
];

const BUILD_QUEUE = [
  { task: "Wire panel to live file system reads", priority: "high" },
  { task: "Add route test dashboard", priority: "high" },
  { task: "Add daily memory compression runner", priority: "medium" },
  { task: "Add repo intake workflow", priority: "low" },
] as const;

const SECTION_PREVIEWS: Record<string, string> = {
  Core: `# Routing Rules

Goal: choose the smallest correct set of files for the task.

Rules:
1. Route to exactly one primary workflow or one to three skills.
2. Prefer a workflow when the task requires multiple major steps.
3. Load only the minimum memory needed.
4. Never load the full skill library \u2014 the index is enough.`,
  Router: `# Skill Index

## summarize_video
Use for:
- YouTube links
- tutorial summaries

## repo_analysis
Use for:
- GitHub repos
- reusable patterns

## context_trim
Use for:
- reducing context load before execution`,
  Skills: `# Skill: Repo Analysis

## Purpose
Analyze a GitHub repository and extract only the patterns
useful for the local OpenClaw system.

## Triggers
- User provides a GitHub URL
- User asks to analyze a repository

## Output
- repo_purpose
- important_files
- core_mechanism
- keep / adapt / ignore
- integration_path`,
  Workflows: `# Workflow: Daily Memory Compression

## Goal
Compress the day\u2019s notes, decisions, experiment logs,
and inbox items into durable memory updates.

## Steps
1. Read all memory files
2. Identify new durable insights
3. Merge into existing notes
4. Prune redundancies

## Output
- durable_insights
- updated_memory_files
- unresolved_questions
- next_focus`,
  Memory: `# Current Focus

Current mission:
Build a stable markdown brain for local OpenClaw
on the M1 Mac mini.

Current priorities:
1. Harden router and executor split
2. Keep context lean with daily compression
3. Expand skills without overlap
4. Prepare Mission Control for live file reads`,
  Targets: `# Eval Rubric

Score each target from 1 to 5 on:
- clarity         \u2014 Is the purpose obvious?
- narrow scope    \u2014 Does it do one thing?
- trigger quality \u2014 Is routing unambiguous?
- procedural use  \u2014 Can the executor follow it?
- output spec     \u2014 Is the output well-defined?
- reusability     \u2014 Does it compose cleanly?`,
};

/* ────────────────────────────────────────────────────────────
   Sub-components
   ──────────────────────────────────────────────────────────── */

function GlassPanel({
  children,
  className = "",
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: "cyan" | "mint" | "purple" | "orange" | "gold";
}) {
  const glowRing: Record<string, string> = {
    cyan: "shadow-[0_0_40px_-12px_rgba(0,212,255,0.15)]",
    mint: "shadow-[0_0_40px_-12px_rgba(0,255,179,0.12)]",
    purple: "shadow-[0_0_40px_-12px_rgba(185,77,255,0.12)]",
    orange: "shadow-[0_0_40px_-12px_rgba(255,107,53,0.12)]",
    gold: "shadow-[0_0_40px_-12px_rgba(255,200,50,0.15)]",
  };
  return (
    <div
      className={`rounded-2xl border border-apex-muted/20 bg-apex-p1/80 backdrop-blur-sm ${
        glow ? glowRing[glow] : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Pass: "bg-apex-mint",
    Keep: "bg-apex-mint",
    Fail: "bg-apex-red",
    Rejected: "bg-apex-red",
    Pending: "bg-apex-gold",
    Queued: "bg-apex-gold",
    Testing: "bg-apex-cyan animate-pulse",
  };
  return (
    <span className={`inline-block h-2 w-2 rounded-full ${colors[status] ?? "bg-apex-muted"}`} />
  );
}

function Badge({
  children,
  variant = "cyan",
}: {
  children: ReactNode;
  variant?: "cyan" | "mint" | "orange" | "purple" | "gold" | "red" | "muted";
}) {
  const styles: Record<string, string> = {
    cyan: "border-apex-cyan/25 bg-apex-cyan/8 text-apex-cyan",
    mint: "border-apex-mint/25 bg-apex-mint/8 text-apex-mint",
    orange: "border-apex-orange/25 bg-apex-orange/8 text-apex-orange",
    purple: "border-apex-purple/25 bg-apex-purple/8 text-apex-purple",
    gold: "border-apex-gold/25 bg-apex-gold/8 text-apex-gold",
    red: "border-apex-red/25 bg-apex-red/8 text-apex-red",
    muted: "border-apex-muted/30 bg-apex-p3/60 text-apex-secondary",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

function ProgressBar({ value, color = "cyan" }: { value: number; color?: string }) {
  const barColors: Record<string, string> = {
    cyan: "bg-gradient-to-r from-apex-cyan/80 to-apex-cyan",
    mint: "bg-gradient-to-r from-apex-mint/80 to-apex-mint",
    orange: "bg-gradient-to-r from-apex-orange/80 to-apex-orange",
    purple: "bg-gradient-to-r from-apex-purple/80 to-apex-purple",
    gold: "bg-gradient-to-r from-apex-gold/80 to-apex-gold",
  };
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-apex-p3/60">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${barColors[color] ?? barColors.cyan}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────────────────────── */

export default function OpenClawMissionControl() {
  const [selectedTitle, setSelectedTitle] = useState("Skills");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectedSection = useMemo(
    () => SECTIONS.find((s) => s.title === selectedTitle) ?? SECTIONS[0],
    [selectedTitle],
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return selectedSection.items;
    const q = searchQuery.toLowerCase();
    return selectedSection.items.filter((item) => item.toLowerCase().includes(q));
  }, [selectedSection.items, searchQuery]);

  const preview = SECTION_PREVIEWS[selectedSection.title] ?? "";

  /* Keyboard navigation */
  const handleKeyNav = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const idx = SECTIONS.findIndex((s) => s.title === selectedTitle);
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setSelectedTitle(SECTIONS[(idx + 1) % SECTIONS.length].title);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setSelectedTitle(SECTIONS[(idx - 1 + SECTIONS.length) % SECTIONS.length].title);
      } else if (e.key === "/") {
        e.preventDefault();
        document.getElementById("mc-search")?.focus();
      }
    },
    [selectedTitle],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, [handleKeyNav]);

  const totalAssets = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
  const passRate = Math.round(
    (TEST_CASES.filter((t) => t.status === "Pass").length / TEST_CASES.length) * 100,
  );

  return (
    <div className="min-h-screen bg-apex-bg text-apex-text">
      {/* Ambient background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(0,212,255,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[800px] bg-[radial-gradient(ellipse,rgba(185,77,255,0.04)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage: "radial-gradient(circle at 50% 25%, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] p-4 md:p-6 xl:p-8">
        {/* ─── Header ─── */}
        <header className="rounded-2xl border border-apex-muted/15 bg-gradient-to-br from-apex-p1 via-apex-bg to-apex-p2/50 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <Badge variant="cyan">Atlas Operational Mission Control</Badge>
              <h1
                className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl"
                style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}
              >
                Operational Command Deck
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-apex-secondary md:text-base">
                One organized command surface for Atlas architecture, memory, active work, experiments, and system visibility. Tiny files. Big order. Better operational clarity.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-apex-muted">
                <span>{totalAssets} total assets</span>
                <span className="text-apex-muted/40">|</span>
                <span>{passRate}% route accuracy</span>
                <span className="text-apex-muted/40">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-apex-mint" />
                  System healthy
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {STAT_CARDS.map((card) => {
                const borderColor: Record<string, string> = {
                  cyan: "border-apex-cyan/20 hover:border-apex-cyan/40",
                  mint: "border-apex-mint/20 hover:border-apex-mint/40",
                  purple: "border-apex-purple/20 hover:border-apex-purple/40",
                  orange: "border-apex-orange/20 hover:border-apex-orange/40",
                };
                const valueColor: Record<string, string> = {
                  cyan: "text-apex-cyan",
                  mint: "text-apex-mint",
                  purple: "text-apex-purple",
                  orange: "text-apex-orange",
                };
                return (
                  <div
                    key={card.label}
                    className={`rounded-xl border bg-apex-p1/70 p-4 transition-all duration-300 ${borderColor[card.color]}`}
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-apex-muted">
                      {card.label}
                    </div>
                    <div
                      className={`mt-1.5 text-xl font-bold ${valueColor[card.color]}`}
                      style={{ fontFamily: "'DM Mono', 'JetBrains Mono', monospace" }}
                    >
                      {card.value}
                    </div>
                    {card.trend && (
                      <div className="mt-1 text-[10px] text-apex-secondary">{card.trend}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* ─── Main Layout ─── */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_340px]">
          {/* ─── Left Sidebar ─── */}
          <aside className="space-y-4">
            <GlassPanel className="p-4" glow="cyan">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-apex-muted">
                  Navigation
                </span>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-lg px-2 py-0.5 text-xs text-apex-secondary transition hover:bg-apex-p3/50 hover:text-apex-text xl:hidden"
                >
                  {sidebarOpen ? "Collapse" : "Expand"}
                </button>
              </div>

              <div className={`space-y-2 ${sidebarOpen ? "" : "hidden xl:block"}`}>
                {SECTIONS.map((section) => {
                  const isActive = section.title === selectedSection.title;
                  return (
                    <button
                      key={section.title}
                      onClick={() => {
                        setSelectedTitle(section.title);
                        setSearchQuery("");
                      }}
                      className={`group w-full rounded-xl border px-3.5 py-2.5 text-left transition-all duration-200 ${
                        isActive
                          ? "border-apex-cyan/30 bg-apex-cyan/8 shadow-[0_0_20px_-8px_rgba(0,212,255,0.15)]"
                          : "border-transparent hover:border-apex-muted/20 hover:bg-apex-p2/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{section.icon}</span>
                          <span
                            className={`text-sm font-medium transition ${
                              isActive
                                ? "text-apex-cyan"
                                : "text-apex-text group-hover:text-white"
                            }`}
                          >
                            {section.title}
                          </span>
                        </div>
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                            isActive
                              ? "bg-apex-cyan/15 text-apex-cyan"
                              : "bg-apex-p3/40 text-apex-muted"
                          }`}
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {section.items.length}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] leading-4 text-apex-muted">
                        {section.description}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 border-t border-apex-muted/10 pt-3">
                <div className="flex items-center gap-2 text-[10px] text-apex-muted">
                  <kbd className="rounded border border-apex-muted/20 bg-apex-p3/40 px-1.5 py-0.5 font-mono text-[9px]">
                    j/k
                  </kbd>
                  navigate
                  <kbd className="rounded border border-apex-muted/20 bg-apex-p3/40 px-1.5 py-0.5 font-mono text-[9px]">
                    /
                  </kbd>
                  search
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="p-4" glow="purple">
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-apex-purple">
                Current Focus
              </div>
              <p className="mt-2.5 text-sm font-medium leading-6 text-apex-text">
                {FOCUS.mission}
              </p>
              <div className="mt-3 space-y-1.5">
                {FOCUS.priorities.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 rounded-lg border border-apex-muted/10 bg-apex-p2/40 px-3 py-2 text-[12px] leading-5 text-apex-secondary"
                  >
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-apex-purple/15 text-[9px] font-bold text-apex-purple"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </GlassPanel>
          </aside>

          {/* ─── Main Content ─── */}
          <main className="space-y-6">
            {/* Section Explorer */}
            <GlassPanel className="p-5" glow="cyan">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedSection.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {selectedSection.title}
                      </h2>
                      <p className="mt-0.5 text-sm text-apex-secondary">
                        {selectedSection.description}
                      </p>
                    </div>
                  </div>
                </div>
                <Badge variant="mint">
                  <StatusDot status="Pass" />
                  Ready for live wiring
                </Badge>
              </div>

              {/* Search */}
              <div className="relative mt-4">
                <svg
                  className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-apex-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <input
                  id="mc-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${selectedSection.title.toLowerCase()} assets...`}
                  className="w-full rounded-xl border border-apex-muted/15 bg-apex-bg/60 py-2.5 pl-9 pr-4 text-sm text-apex-text placeholder:text-apex-muted/60 focus:border-apex-cyan/40 focus:outline-none focus:ring-1 focus:ring-apex-cyan/20"
                />
              </div>

              {/* Asset Grid */}
              <div className="mt-4 grid gap-2.5 md:grid-cols-2">
                {filteredItems.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center justify-between rounded-xl border border-apex-muted/10 bg-apex-bg/50 px-4 py-3 transition-all duration-200 hover:border-apex-cyan/25 hover:bg-apex-p2/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-apex-p3/50 text-[11px] text-apex-muted transition group-hover:bg-apex-cyan/10 group-hover:text-apex-cyan">
                        .md
                      </div>
                      <div>
                        <div className="text-sm font-medium text-apex-text">{item}</div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-apex-muted">
                          markdown asset
                        </div>
                      </div>
                    </div>
                    <svg
                      className="h-4 w-4 text-apex-muted/40 transition group-hover:text-apex-cyan"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ))}
                {filteredItems.length === 0 && (
                  <div className="col-span-2 py-8 text-center text-sm text-apex-muted">
                    No assets match &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>

              {/* Preview */}
              <div className="mt-5 rounded-xl border border-apex-muted/10 bg-apex-bg/70 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-apex-red/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-apex-gold/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-apex-mint/70" />
                    <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.24em] text-apex-muted">
                      Preview
                    </span>
                  </div>
                  <Badge variant="muted">{selectedSection.title}</Badge>
                </div>
                <pre
                  className="mt-3 overflow-x-auto text-[12px] leading-6 text-apex-secondary"
                  style={{ fontFamily: "'DM Mono', 'JetBrains Mono', monospace" }}
                >
                  {preview}
                </pre>
              </div>
            </GlassPanel>

            {/* Experiments + Test Cases */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Experiments */}
              <GlassPanel className="p-5" glow="mint">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Active Experiments</h3>
                  <Badge variant="mint">Autoresearch</Badge>
                </div>
                <div className="mt-4 space-y-3">
                  {EXPERIMENTS.map((exp) => {
                    const statusVariant: Record<string, "mint" | "gold" | "cyan" | "red"> = {
                      Keep: "mint",
                      Queued: "gold",
                      Testing: "cyan",
                      Rejected: "red",
                    };
                    const barColor: Record<string, string> = {
                      Keep: "mint",
                      Queued: "gold",
                      Testing: "cyan",
                      Rejected: "red",
                    };
                    return (
                      <div
                        key={exp.id}
                        className="rounded-xl border border-apex-muted/10 bg-apex-bg/50 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs font-bold text-apex-secondary"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            EXP-{exp.id}
                          </span>
                          <Badge variant={statusVariant[exp.status]}>
                            <StatusDot status={exp.status} />
                            {exp.status}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm font-medium text-apex-text">
                          {exp.target}
                        </div>
                        <p className="mt-1.5 text-[12px] leading-5 text-apex-muted">
                          {exp.hypothesis}
                        </p>
                        <div className="mt-3">
                          <ProgressBar
                            value={exp.progress}
                            color={barColor[exp.status]}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassPanel>

              {/* Test Cases */}
              <GlassPanel className="p-5" glow="orange">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Router Test Cases</h3>
                  <Badge variant="orange">Diagnostics</Badge>
                </div>
                <div className="mt-4 space-y-3">
                  {TEST_CASES.map((tc) => {
                    const statusVariant: Record<string, "mint" | "gold" | "red"> = {
                      Pass: "mint",
                      Pending: "gold",
                      Fail: "red",
                    };
                    return (
                      <div
                        key={tc.task}
                        className="rounded-xl border border-apex-muted/10 bg-apex-bg/50 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs font-bold text-apex-text"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            {tc.expected}
                          </span>
                          <Badge variant={statusVariant[tc.status]}>
                            <StatusDot status={tc.status} />
                            {tc.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-[12px] leading-5 text-apex-muted">
                          {tc.task}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between rounded-lg border border-apex-muted/10 bg-apex-p2/30 px-3 py-2">
                  <span className="text-[11px] text-apex-muted">Route accuracy</span>
                  <span
                    className="text-sm font-bold text-apex-mint"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {passRate}%
                  </span>
                </div>
              </GlassPanel>
            </div>
          </main>

          {/* ─── Right Sidebar ─── */}
          <aside className="space-y-4">
            {/* System Flow */}
            <GlassPanel className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">System Flow</h3>
                <Badge variant="cyan">Control Logic</Badge>
              </div>
              <div className="mt-4 space-y-2">
                {SYSTEM_FLOW.map((item) => {
                  const dotColor: Record<string, string> = {
                    cyan: "bg-apex-cyan",
                    mint: "bg-apex-mint",
                    orange: "bg-apex-orange",
                    purple: "bg-apex-purple",
                    gold: "bg-apex-gold",
                  };
                  return (
                    <div
                      key={item.step}
                      className="flex items-center gap-3 rounded-xl border border-apex-muted/8 bg-apex-bg/40 px-3.5 py-2.5"
                    >
                      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                        <div
                          className={`absolute h-full w-full rounded-full ${dotColor[item.accent]} opacity-15`}
                        />
                        <span
                          className="relative text-[10px] font-bold text-apex-text"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          {item.step}
                        </span>
                      </div>
                      <span className="text-[12px] leading-5 text-apex-secondary">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>

            {/* Memory Snapshot */}
            <GlassPanel className="p-5">
              <h3 className="text-base font-bold text-white">Memory Snapshot</h3>
              <div className="mt-3 space-y-2">
                {MEMORY_SNAPSHOT.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-apex-muted/8 bg-apex-bg/40 px-3.5 py-2.5 text-[12px] leading-5 text-apex-secondary"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassPanel>

            {/* Activity Log */}
            <GlassPanel className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Activity Log</h3>
                <span className="text-[10px] uppercase tracking-[0.24em] text-apex-muted">
                  Recent
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {ACTIVITY.map((item) => {
                  const dotColor: Record<string, string> = {
                    success: "bg-apex-mint",
                    info: "bg-apex-cyan",
                    next: "bg-apex-gold animate-pulse",
                  };
                  return (
                    <div
                      key={item.event}
                      className="rounded-xl border border-apex-muted/8 bg-apex-bg/40 p-3.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 rounded-full ${dotColor[item.type]}`} />
                          <span className="text-[12px] font-medium text-apex-text">
                            {item.event}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-apex-muted">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-1.5 pl-4 text-[11px] leading-4 text-apex-muted">
                        {item.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>

            {/* Build Queue */}
            <GlassPanel className="p-5" glow="gold">
              <h3 className="text-base font-bold text-white">Build Queue</h3>
              <div className="mt-3 space-y-2">
                {BUILD_QUEUE.map((item) => {
                  const priorityColor: Record<string, string> = {
                    high: "text-apex-red",
                    medium: "text-apex-gold",
                    low: "text-apex-muted",
                  };
                  const priorityBg: Record<string, string> = {
                    high: "bg-apex-red/10",
                    medium: "bg-apex-gold/10",
                    low: "bg-apex-p3/40",
                  };
                  return (
                    <div
                      key={item.task}
                      className="flex items-center justify-between gap-3 rounded-xl border border-apex-muted/8 bg-apex-bg/40 px-3.5 py-2.5"
                    >
                      <span className="text-[12px] leading-5 text-apex-secondary">
                        {item.task}
                      </span>
                      <span
                        className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${priorityColor[item.priority]} ${priorityBg[item.priority]}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-8 flex items-center justify-between rounded-2xl border border-apex-muted/10 bg-apex-p1/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-apex-cyan" />
            <span className="text-xs text-apex-muted">
              Atlas Operational Mission Control &middot; Apex Capital Dark
            </span>
          </div>
          <div className="hidden items-center gap-4 text-[10px] text-apex-muted md:flex">
            <span>{SECTIONS.length} sections</span>
            <span>{totalAssets} assets</span>
            <span>{EXPERIMENTS.length} experiments</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
