import { Text } from "@/components/ui/Text";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen">
      <div className="flex justify-center items-center gap-4">
        <Text variant="large/semibold">
          <h3>Demo:</h3>
        </Text>
        <div className="flex flex-col">
          <span>Username: demo</span>
          <span>Password: demopass</span>
        </div>
      </div>
      <SignIn />
    </div>
  );
}
