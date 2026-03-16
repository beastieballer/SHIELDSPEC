import Link from "next/link";
import type { MissionControlData } from "@/lib/missionControlData";

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-apex-muted/15 bg-apex-p1/80 backdrop-blur-sm ${className}`}
    >
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-apex-muted">
      {children}
    </div>
  );
}

function Pill({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "mint" | "gold" | "orange" | "muted" }) {
  const tones = {
    cyan: "border-apex-cyan/20 bg-apex-cyan/8 text-apex-cyan",
    mint: "border-apex-mint/20 bg-apex-mint/8 text-apex-mint",
    gold: "border-apex-gold/20 bg-apex-gold/8 text-apex-gold",
    orange: "border-apex-orange/20 bg-apex-orange/8 text-apex-orange",
    muted: "border-apex-muted/20 bg-apex-p3/40 text-apex-secondary",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

function ItemList({ items, dense = false }: { items: string[]; dense?: boolean }) {
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div
          key={item}
          className={`rounded-xl border border-apex-muted/10 bg-apex-bg/45 px-4 ${dense ? "py-2.5" : "py-3"}`}
        >
          <div className="flex gap-3">
            <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-apex-cyan" />
            <p className="text-sm leading-6 text-apex-text/92">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ExecutiveMissionOverview({ data }: { data: MissionControlData }) {
  const activeProjectCount = data.activeProjects.filter((project) => /active/i.test(project.status)).length;

  return (
    <div className="min-h-screen bg-apex-bg text-apex-text">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[920px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[640px] bg-[radial-gradient(ellipse,rgba(185,77,255,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-4 py-4 sm:px-6 sm:py-6 lg:gap-6 lg:px-8">
        <header className="rounded-3xl border border-apex-muted/15 bg-gradient-to-br from-apex-p1 via-apex-bg to-apex-p2/70 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Pill tone="cyan">Atlas Operational Mission Control</Pill>
              <h1
                className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "'Bebas Neue', 'Outfit', sans-serif" }}
              >
                Real work. Real state. Less theater.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-apex-secondary sm:text-base">
                Executive view of Atlas pulled from live markdown surfaces in the workspace. Mobile-first at the top, deeper inspection one step down.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Pill tone="mint">{data.activeLanes.length} active lanes</Pill>
                <Pill tone="gold">{activeProjectCount} active projects</Pill>
                <Pill tone="orange">{data.recentlyCompleted.length} recent wins</Pill>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
              <Panel className="p-4">
                <Eyebrow>Focus source</Eyebrow>
                <div className="mt-2 text-lg font-semibold text-white">{data.currentFocusTitle}</div>
                <div className="mt-1 text-xs text-apex-secondary">{data.sourceStatus.find((item) => item.label === "Current focus")?.found ? "live markdown" : "queue fallback"}</div>
              </Panel>
              <Panel className="p-4">
                <Eyebrow>Target source</Eyebrow>
                <div className="mt-2 text-lg font-semibold text-white">{data.currentTargetTitle}</div>
                <div className="mt-1 text-xs text-apex-secondary">{data.sourceStatus.find((item) => item.label === "Current target")?.found ? "live markdown" : "queue fallback"}</div>
              </Panel>
              <Panel className="p-4 col-span-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Eyebrow>Queue surface</Eyebrow>
                    <p className="mt-2 text-sm leading-6 text-apex-text/92">
                      {data.queueSurface ?? "CURRENT_PROJECTS.md is the active queue surface for adjacent useful work."}
                    </p>
                  </div>
                  <Link
                    href="/mission-control"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-apex-cyan/20 bg-apex-cyan/8 px-4 py-2 text-sm font-medium text-apex-cyan transition hover:border-apex-cyan/35 hover:bg-apex-cyan/12"
                  >
                    Open deep inspector
                  </Link>
                </div>
              </Panel>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Panel className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <Eyebrow>Executive summary</Eyebrow>
                <h2 className="mt-2 text-2xl font-bold text-white">What Atlas is doing now</h2>
              </div>
              <Pill tone="mint">home route</Pill>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-apex-cyan">Active lanes</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.activeLanes.map((lane) => (
                    <span key={lane} className="rounded-full border border-apex-cyan/15 bg-apex-cyan/8 px-3 py-2 text-sm text-apex-text">
                      {lane}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-apex-orange">Active work</h3>
                <div className="mt-3 space-y-2.5">
                  {data.activeWork.slice(0, 5).map((item) => (
                    <div key={item} className="rounded-xl border border-apex-muted/10 bg-apex-bg/45 px-4 py-3 text-sm text-apex-text/92">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel className="p-5 sm:p-6">
            <Eyebrow>Current focus</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold text-white">{data.currentFocusTitle}</h2>
            <div className="mt-4">
              <ItemList items={data.currentFocusBody.slice(0, 5)} />
            </div>
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Panel className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <Eyebrow>Current target</Eyebrow>
                <h2 className="mt-2 text-2xl font-bold text-white">{data.currentTargetTitle}</h2>
              </div>
              <Pill tone="gold">steer next work</Pill>
            </div>
            <div className="mt-4">
              <ItemList items={data.currentTargetBody.slice(0, 5)} />
            </div>
          </Panel>

          <div className="grid gap-5 sm:grid-cols-2">
            <Panel className="p-5 sm:p-6">
              <Eyebrow>Recent wins</Eyebrow>
              <h2 className="mt-2 text-xl font-bold text-white">Recently completed</h2>
              <div className="mt-4">
                <ItemList items={data.recentlyCompleted.slice(0, 6)} dense />
              </div>
            </Panel>
            <Panel className="p-5 sm:p-6">
              <Eyebrow>Next useful steps</Eyebrow>
              <h2 className="mt-2 text-xl font-bold text-white">Immediate leverage</h2>
              <div className="mt-4">
                <ItemList items={data.nextUsefulSteps.slice(0, 6)} dense />
              </div>
            </Panel>
          </div>
        </div>

        <Panel className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Project queue</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold text-white">Active projects from CURRENT_PROJECTS.md</h2>
            </div>
            <div className="text-xs text-apex-muted">Generated {new Date(data.generatedAt).toLocaleString()}</div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {data.activeProjects.slice(0, 4).map((project) => (
              <div key={project.name} className="rounded-2xl border border-apex-muted/10 bg-apex-bg/45 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    {project.purpose && (
                      <p className="mt-2 text-sm leading-6 text-apex-secondary">{project.purpose}</p>
                    )}
                  </div>
                  <Pill tone={/secondary/i.test(project.status) ? "gold" : "mint"}>{project.status}</Pill>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-apex-muted">Current focus</div>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-apex-text/90">
                      {project.currentFocus.slice(0, 3).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-apex-muted">Next deliverables</div>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-apex-text/90">
                      {project.nextDeliverables.slice(0, 3).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow>Source health</Eyebrow>
              <h2 className="mt-2 text-xl font-bold text-white">Live markdown coverage</h2>
            </div>
            <Pill tone="muted">workspace-backed</Pill>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {data.sourceStatus.map((source) => (
              <div key={source.label} className="rounded-xl border border-apex-muted/10 bg-apex-bg/45 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium text-white">{source.label}</div>
                  <span className={`inline-block h-2.5 w-2.5 rounded-full ${source.found ? "bg-apex-mint" : "bg-apex-gold"}`} />
                </div>
                <div className="mt-2 text-xs leading-5 text-apex-secondary break-all">{source.path}</div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-apex-muted">
                  {source.found ? "live" : "fallback in use"}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
