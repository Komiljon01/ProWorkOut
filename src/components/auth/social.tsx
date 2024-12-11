// Components
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FillLoading from "../shared/fill-loading";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";

function Social() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };

  const onGithub = () => {
    setLoading(true);
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      {loading && <FillLoading />}
      <Separator className="my-3" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          className="h-12"
          variant="secondary"
          disabled={loading}
          onClick={onGithub}
        >
          <FaGithub className="mr-2" />
          <span>Sign in with Github</span>
        </Button>
        <Button
          className="h-12"
          variant="destructive"
          disabled={loading}
          onClick={onGoogle}
        >
          <FaGoogle className="mr-2" />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </>
  );
}

export default Social;
