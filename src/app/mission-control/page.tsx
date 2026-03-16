import type { Metadata } from "next";
import OpenClawMissionControl from "@/components/OpenClawMissionControl";

export const metadata: Metadata = {
  title: "OpenClaw Mission Control",
  description: "Markdown Brain Command Deck — Router, skills, workflows, memory, and targets.",
};

export default function MissionControlPage() {
  return <OpenClawMissionControl />;
}
