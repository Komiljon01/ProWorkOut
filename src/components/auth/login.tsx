import { useAuthState } from "@/stores/auth.store";

// Components
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

function Login() {
  const { setAuth } = useAuthState();
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Login</h2>
      <p className="text-muted-foreground">
        Don't have an account?{" "}
        <span
          className="cursor-pointer text-blue-500 hover:underline"
          onClick={() => setAuth("register")}
        >
          Sign up
        </span>
      </p>
      <Separator className="my-5" />
      <div>
        <span>Email</span>
        <Input placeholder="example@gmail.com" type="email" />
      </div>
      <div className="mt-2">
        <span>Password</span>
        <Input placeholder="*****" type="password" />
      </div>
      <Button className="mt-5 h-12 w-full">Login</Button>
    </div>
  );
}

export default Login;
