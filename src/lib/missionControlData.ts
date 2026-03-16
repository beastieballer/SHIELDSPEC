import fs from "node:fs/promises";
import path from "node:path";

const WORKSPACE_ROOT = "/Users/alexpotter/.openclaw/workspace";

export interface ProjectSummary {
  name: string;
  status: string;
  purpose?: string;
  nextDeliverables: string[];
  currentFocus: string[];
}

export interface MissionControlData {
  activeLanes: string[];
  activeWork: string[];
  recentlyCompleted: string[];
  nextUsefulSteps: string[];
  queueSurface?: string;
  currentFocusTitle: string;
  currentFocusBody: string[];
  currentTargetTitle: string;
  currentTargetBody: string[];
  activeProjects: ProjectSummary[];
  sourceStatus: Array<{ label: string; path: string; found: boolean }>;
  generatedAt: string;
}

async function readOptional(relativePath: string) {
  const absolutePath = path.join(WORKSPACE_ROOT, relativePath);
  try {
    const content = await fs.readFile(absolutePath, "utf8");
    return { path: absolutePath, content, found: true };
  } catch {
    return { path: absolutePath, content: "", found: false };
  }
}

function parseBulletSection(markdown: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`## ${escaped}\\n([\\s\\S]*?)(?=\\n## |$)`));
  if (!match) return [];
  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s+/, "").trim())
    .filter(Boolean);
}

function parseParagraphSection(markdown: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`## ${escaped}\\n([\\s\\S]*?)(?=\\n## |$)`));
  if (!match) return "";
  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function parseProjectSummaries(markdown: string): ProjectSummary[] {
  const blocks = markdown.split(/\n## Project \d+: /).slice(1);

  return blocks
    .map((block) => {
      const [nameLine, ...rest] = block.split("\n");
      const name = nameLine.trim();
      const body = rest.join("\n");
      const status = body.match(/### Current Status\n([^\n]+)/)?.[1]?.trim() ?? "Unknown";
      const purpose = body.match(/### Purpose\n([\s\S]*?)(?=\n### |$)/)?.[1]?.trim();
      const nextDeliverables = (body.match(/### Next Best Deliverables\n([\s\S]*?)(?=\n### |$)/)?.[1] ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("- "))
        .map((line) => line.replace(/^-\s+/, ""));
      const currentFocus = (body.match(/### Current Focus\n([\s\S]*?)(?=\n### |$)/)?.[1] ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("- "))
        .map((line) => line.replace(/^-\s+/, ""));

      return { name, status, purpose, nextDeliverables, currentFocus };
    })
    .filter((project) => project.name);
}

function parseMarkdownBody(markdown: string, fallbackTitle: string) {
  const lines = markdown
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const title = lines.find((line) => line.startsWith("# "))?.replace(/^#\s+/, "") ?? fallbackTitle;
  const body = lines
    .filter((line) => !line.startsWith("# "))
    .map((line) => line.replace(/^[-*]\s+/, ""))
    .slice(0, 8);

  return { title, body };
}

export async function getMissionControlData(): Promise<MissionControlData> {
  const [statusFile, projectsFile, focusFile, targetFile] = await Promise.all([
    readOptional("mission-control-status.md"),
    readOptional("CURRENT_PROJECTS.md"),
    readOptional("atlas-bridge/memory/current_focus.md"),
    readOptional("atlas-bridge/targets/current_target.md"),
  ]);

  const activeProjects = projectsFile.found ? parseProjectSummaries(projectsFile.content) : [];

  const currentFocus = focusFile.found
    ? parseMarkdownBody(focusFile.content, "Current Focus")
    : {
        title: "Current Focus",
        body:
          activeProjects[0]?.currentFocus.slice(0, 4) ?? [
            "Maintain bridge quality.",
            "Improve routing discipline.",
            "Strengthen memory feedback loops.",
          ],
      };

  const currentTarget = targetFile.found
    ? parseMarkdownBody(targetFile.content, "Current Target")
    : {
        title: "Current Target",
        body:
          activeProjects[0]?.nextDeliverables.slice(0, 4) ?? [
            "Improve bridge visibility in Mission Control.",
            "Keep dashboard-facing status surfaces coherent.",
          ],
      };

  return {
    activeLanes: parseBulletSection(statusFile.content, "Active Lanes"),
    activeWork: parseBulletSection(statusFile.content, "Active Work"),
    recentlyCompleted: parseBulletSection(statusFile.content, "Recently Completed"),
    nextUsefulSteps: parseBulletSection(statusFile.content, "Next Useful Steps"),
    queueSurface: parseParagraphSection(statusFile.content, "Queue Surface"),
    currentFocusTitle: currentFocus.title,
    currentFocusBody: currentFocus.body,
    currentTargetTitle: currentTarget.title,
    currentTargetBody: currentTarget.body,
    activeProjects,
    sourceStatus: [statusFile, projectsFile, focusFile, targetFile].map((file, index) => ({
      label: ["Mission status", "Project queue", "Current focus", "Current target"][index],
      path: file.path,
      found: file.found,
    })),
    generatedAt: new Date().toISOString(),
  };
}
