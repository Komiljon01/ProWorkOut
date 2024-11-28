// Firebase
import { auth } from "@/firebase";

// Store
import { useUserState } from "@/stores/user.store";

// Constants
import { featuredItems, programs } from "@/constants";

// Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// React icons
import { FaArrowRightLong } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { LogOut } from "lucide-react";

// rrd imports
import { Link, useNavigate } from "react-router-dom";

// import images
import men from "@/assets/men.png";

function Home() {
  const { user, setUser } = useUserState();
  const navigate = useNavigate();

  const onLogOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  return (
    <>
      <div className="mt-16 flex h-screen w-full items-center">
        <div className="ml-60 flex h-full max-w-xl flex-col justify-center">
          <h1 className="text-9xl font-semibold uppercase">Workout with me</h1>
          <p className="text-muted-foreground">
            A huge selection of health and fitness content, healthy recipes and
            transformation stories to help you get fit and stay fit!
          </p>
          {user ? (
            <div className="mt-6 flex gap-4">
              <Link to="/dashboard">
                <Button className="h-12 w-fit font-bold" size={"lg"}>
                  <span>Go to Gym</span>
                  <CgGym className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                className="h-12 w-fit font-bold"
                variant={"destructive"}
                size={"lg"}
                onClick={onLogOut}
              >
                <span>Log Out</span>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button className="mt-6 h-12 w-fit font-bold" size={"lg"}>
                Join club now
              </Button>
            </Link>
          )}

          <div className="mt-24">
            <p className="text-muted-foreground">AS FEATURED IN</p>
            <div className="mt-2 flex items-center gap-4">
              {featuredItems.map((Icon, index) => (
                <Icon key={index} className="h-12 w-12" />
              ))}
            </div>
          </div>
        </div>

        <img src={men} alt="men" className="w-1/4" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl">Not sure where to start?</h1>
        <p className="mt-2 text-muted-foreground">
          Programs offer day-to-day guidance on an interactive calendar to keep
          you on track.
        </p>

        <div className="my-8 grid grid-cols-3 gap-4">
          {programs.map((item) => (
            <Card
              key={item.title}
              className="group relative cursor-pointer p-8"
            >
              <h3>{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.descr}</p>
              <Button
                size={"icon"}
                variant={"link"}
                className="absolute right-2 top-1/2 transition-transform group-hover:translate-x-1"
              >
                <FaArrowRightLong />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
