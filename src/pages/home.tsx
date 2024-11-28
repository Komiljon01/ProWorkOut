// Constants
import { featuredItems, programs } from "@/constants";

// Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// React icons
import { FaArrowRightLong } from "react-icons/fa6";

// rrd imports
import { Link } from "react-router-dom";

// import images
import men from "@/assets/men.png";

function Home() {
  return (
    <>
      <div className="mt-16 flex h-screen w-full items-center">
        <div className="ml-60 flex h-full max-w-xl flex-col justify-center">
          <h1 className="text-9xl font-semibold uppercase">Workout with me</h1>
          <p className="text-muted-foreground">
            A huge selection of health and fitness content, healthy recipes and
            transformation stories to help you get fit and stay fit!
          </p>
          <Link to="/auth">
            <Button className="mt-6 h-12 w-fit font-bold" size={"lg"}>
              Join club now
            </Button>
          </Link>

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
