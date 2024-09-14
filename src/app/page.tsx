import GetStarted from "@/components/shared/GetStarted";
import GridBackground from "@/components/shared/GridBackground";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const githubRepoLink = "https://github.com/nabilfaturr/noteworthy";

export default async function Home() {
  return (
    <section className="min-h-screen">
      <GridBackground />
      <Github />
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <div className="h-full flex flex-row justify-center items-center mb-20 lg:px-40 gap-20">
          <div className="w-full h-full flex flex-col justify-center p-1 gap-3 sm:gap-5">
            <h1 className="px-2 flex flex-col items-start text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-center">
              <span className="w-full">Where Ideas</span>
              <span className="flex flex-row gap-2">
                Become
                <span className="text-blue-500">
                Noteworthy
                </span>
              </span>
            </h1>
            <div className="flex flex-row gap-4 items-center justify-center">
              <Button
                className="w-28 bg-blue-500 text-white hover:bg-blue-600"
                asChild
              >
                <Link href="/dashboard/all">Get Started</Link>
              </Button>
              <GetStarted/>
              {/* <Button
                className="w-28 bg-blue-200 text-blue-500 hover:bg-blue-300"
                asChild
              >
                
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Github = () => {
  return (
    <div className="absolute top-0 left-0 w-full bg-blue-100 text-blue-500 p-2 font-medium text-center">
      This is open source project, see it on{" "}
      <Link href={githubRepoLink} className="underline" target="_blank">
        GitHub
      </Link>
    </div>
  );
};

<div className="w-full h-full flex flex-col">
  <div className="h-full flex flex-row justify-center items-center mb-20 lg:px-40 gap-20">
    <div className="w-full h-full flex flex-col justify-center p-1 gap-3 lg:p-0 lg:gap-0 ">
      <h1>Where Ideas Become Noteworthy</h1>
      <GetStarted />
    </div>
    <div className="w-full hidden xl:flex justify-center items-center h-full">
      <Image
        src={"/aa.png"}
        width={600}
        height={400}
        className="rounded-lg shadow-sm border"
        alt="Noteworthy"
      />
    </div>
  </div>
</div>;
