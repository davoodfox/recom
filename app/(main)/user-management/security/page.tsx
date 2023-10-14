import RedirectButton from "@/components/buttons/RedirectButton";
import { UserProfile } from "@clerk/nextjs";

function Page() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-end shadow-2xl">
        <div>
          <UserProfile
            appearance={{
              elements: {
                card: {
                  background: "white",
                  boxShadow: "none",
                },
                profileSection__username: {
                  display: "none",
                },
                profileSection__activeDevices: {
                  display: "none",
                },
                navbar: {
                  display: "none",
                },

                profilePage__account: {
                  display: "none",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
