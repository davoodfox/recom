import { Group, List, Panel, Panels, Tab } from "@/components/ui/Tab";
import RecommendationsTable from "./RecommendationsTable";
import { Text } from "@/components/ui/Text";

export default function DashboardTabs() {
  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Group>
        <Text variant="medium/normal">Recommendations:</Text>
        <List>
          <Tab>Given</Tab>
          <Tab>Received</Tab>
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
