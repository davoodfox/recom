import { deleteRecommendation } from "@/actions/recommendations";
import { SubmitButton } from "../../../../components/ui/SubmitButton";

export default function RecommendationActions({ id }: { id: string }) {
  return (
    <div>
      <form action={deleteRecommendation}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton intent="danger">Delete</SubmitButton>
      </form>
    </div>
  );
}
