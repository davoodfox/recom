import { Group, List, Panel, Panels, Tab } from "@/components/ui/Tab";
import RecommendationsTable from "./RecommendationsTable";

export default function DashboardTabs() {
  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Group>
        <List>
          <Tab>Recommendations Given</Tab>
          <Tab>Recommendations Received</Tab>
        </List>
        <Panels>
          <Panel>
            <RecommendationsTable host="given" />
          </Panel>
          <Panel>
            <RecommendationsTable host="received" />
          </Panel>
        </Panels>
      </Group>
    </div>
  );
}
