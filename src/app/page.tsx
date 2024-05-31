import GetStarted from "@/components/shared/GetStarted";
import Image from "next/image";
import Link from "next/link";

const githubRepoLink = "https://github.com/nabilfaturr/noteworthy";

export default async function Home() {
  return (
    <main className="w-screen sm:flex flex-col h-screen justify-center bg-slate-100">
      <div className="w-full h-full flex flex-col">
        <div className="w-full bg-fuchsia-400 p-2 font-medium text-center">
          This is open source project, see it on{" "}
          <Link href={githubRepoLink} className="underline" target="_blank">GitHub</Link>
        </div>
        <div className="h-full flex flex-row justify-center items-center mb-20 lg:px-40 gap-20">
          <div className="w-full h-full flex flex-col justify-center p-1 gap-3 lg:p-0 lg:gap-0">
            <h1 className="flex flex-col items-start text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-bold">
              <span>Where</span>
              <span>Ideas</span>
              <span>Become</span>
              <span>Noteworthy</span>
            </h1>
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
      </div>
    </main>
  );
}
