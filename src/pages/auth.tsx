// Components
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import Social from "@/components/auth/social";
import { Card } from "@/components/ui/card";

// UseAuthState
import { useAuthState } from "@/stores/auth.store";

function Auth() {
  const { authState } = useAuthState();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-t from-foreground to-background sm:mt-0 mt-10">
      <Card className="relative mx-5 w-full p-8 md:w-1/2 xl:w-1/3">
        {authState === "login" && <Login />}
        {authState === "register" && <Register />}
        <Social />
      </Card>
    </div>
  );
}

export default Auth;
