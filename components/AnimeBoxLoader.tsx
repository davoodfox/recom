import ContentLoader from "react-content-loader";
import Divider from "./ui/Divider";
import { Text } from "./ui/Text";

export default function Loader({ label }: { label?: string }) {
  return (
    <div>
      {label && (
        <Divider className="pb-1">
          <Text variant="medium/light">{label}</Text>
        </Divider>
      )}
      <div className="overflow-hidden rounded-md">
        <ContentLoader
          speed={2}
          width={1000}
          height={58}
          viewBox="0 0 1000 58"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" width="1000" height="58" />
        </ContentLoader>
      </div>
    </div>
  );
}
