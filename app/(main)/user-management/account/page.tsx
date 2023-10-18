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
                formButtonPrimary: {
                  display: "none",
                },
                formButtonReset: {
                  display: "none",
                },
                profilePage__security: {
                  display: "none",
                },
                navbarMobileMenuButton: {
                  display: "none",
                },
              },
            }}
          />
        </div>
        <RedirectButton />
      </div>
    </div>
  );
}

export default Page;
