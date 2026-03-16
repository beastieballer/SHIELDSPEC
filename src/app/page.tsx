import ExecutiveMissionOverview from "@/components/ExecutiveMissionOverview";
import { getMissionControlData } from "@/lib/missionControlData";

export default async function HomePage() {
  const data = await getMissionControlData();

  return <ExecutiveMissionOverview data={data} />;
}
