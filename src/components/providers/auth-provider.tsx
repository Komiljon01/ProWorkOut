// Firebase
import { auth } from "@/firebase";

// Store
import { useUserState } from "@/stores/user.store";

// React
import { useEffect, ReactNode, useState } from "react";

// Components
import FillLoading from "../shared/fill-loading";

function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser } = useUserState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      setIsloading(false);
    });
  }, []);

  return isLoading ? <FillLoading /> : <>{children}</>;
}

export default AuthProvider;
