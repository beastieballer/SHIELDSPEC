import type { Metadata } from "next";
import OpenClawMissionControl from "@/components/OpenClawMissionControl";

export const metadata: Metadata = {
  title: "Atlas Operational Mission Control",
  description: "Command deck for Atlas architecture, memory, active work, and experiments.",
};

export default function MissionControlPage() {
  return <OpenClawMissionControl />;
}
