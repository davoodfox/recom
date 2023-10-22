import { deleteRecommendation } from "@/actions/recommendations";
import { SubmitButton } from "../../../../components/ui/SubmitButton";
import { MinusIcon, XCircleIcon } from "@heroicons/react/24/outline";
export default function RecommendationActions({ id }: { id: string }) {
  return (
    <form action={deleteRecommendation}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton intent="danger">
        <MinusIcon className="h-6 w-6" />
      </SubmitButton>
    </form>
  );
}
