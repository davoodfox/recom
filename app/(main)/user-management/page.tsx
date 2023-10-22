import { Text } from "@/components/ui/Text";
import Link from "next/link";

function Page() {
  return (
    <div className="shadow-xl p-4 rounded-md">
      <ul>
        <li>
          <Text variant="medium/normal">
            <Link href="/user-management/account" className="text-brand-600">
              Account
            </Link>
          </Text>
        </li>
        <li>
          <Text variant="medium/normal">
            <Link href="/user-management/security" className="text-brand-600">
              Security
            </Link>
          </Text>
        </li>
      </ul>
    </div>
  );
}

export default Page;
