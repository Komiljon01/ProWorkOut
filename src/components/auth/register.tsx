import { useAuthState } from "@/stores/auth.store";

// Components
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Register() {
  const { setAuth } = useAuthState();
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Register</h2>
      <p className="text-muted-foreground">
        Already have an account?{" "}
        <span
          className="cursor-pointer text-blue-500 hover:underline"
          onClick={() => setAuth("login")}
        >
          Sign in
        </span>
      </p>
      <Separator className="my-3" />
      <div>
        <span>Email</span>
        <Input placeholder="example@gmail.com" type="email" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <span>Password</span>
          <Input placeholder="*****" type="password" />
        </div>
        <div>
          <span>Confirm password</span>
          <Input placeholder="*****" type="password" />
        </div>
      </div>
      <Button className="mt-5 h-12 w-full">Register</Button>
    </div>
  );
}

export default Register;
