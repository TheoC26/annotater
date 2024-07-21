import AnnotationCard from "@/components/about/AnnotationCard";
import AnnotaterLogo from "@/components/svg/AnnotaterLogo";
import SmallLogo from "@/components/svg/SmallLogo";
import Squig from "@/components/svg/Squig";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <header className="flex justify-between font-bold p-3 px-5 text-base items-center fixed top-0 w-full bg-gradient-to-b from-white to-transparent z-20">
        <div className="flex items-center gap-12">
          <AnnotaterLogo className="mb-1" />
          <Link href={"/features"} className=" mt-1">
            Features
          </Link>
          <Link href={"/pricing"} className=" mt-1">
            Pricing
          </Link>
          <Link href={"/about"} className=" mt-1">
            About
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <Link href={"/login"} className=" mt-1">
            Login
          </Link>
          <Link
            href={"/signup"}
            className=" mt-1 p-3 px-4 text-white bg-accent rounded-xl"
          >
            Try for free
          </Link>
        </div>
      </header>
      <Squig className="w-full h-full absolute -z-10" />
      <section className="h-[80vh] flex flex-col items-leading p-16 pt-40 gap-24">
        <div className=" text-8xl font-bold">
          Elevate Your <br />{" "}
          <span className=" underline text-accent">Understanding</span>
        </div>
        <div className="flex gap-6">
          <Link
            href={"/login"}
            className="p-3 leading-tight bg-accent border-2 border-accent px-8 rounded-xl text-white font-bold text-2xl transition-all hover:shadow-lg hover:scale-105"
          >
            Try for free
          </Link>
          <Link
            href={"#learn-more"}
            className="p-3 leading-tight border-2 border-accent px-8 rounded-xl text-accent font-bold text-2xl transition-all hover:shadow-lg hover:scale-105"
          >
            Learn more
          </Link>
        </div>
        <AnnotationCard
          type={"setting"}
          content={
            "This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious"
          }
          styles={"right-32 rotate-12 scale-110 top-48"}
        />
        <AnnotationCard
          type={"analysis"}
          content={
            "This passage highlights the main scene of the story and introduces the main character. We learn her name is Elara and that she is curious"
          }
          styles={"right-80 -rotate-3 scale-105 top-[25rem]"}
        />
      </section>
      <section>
        <div className="text-center font-medium text-xl">
          Trusted by thousands of <span className="font-bold">students</span>{" "}
          and <span className="font-bold">professionals</span> world wide
        </div>
        <div class="hidden lg:grid lg:grid-cols-6 lg:grid-rows-6 gap-4 h-[40rem] p-12">
          <div class="col-span-2 row-span-2 bg-gray-200 rounded-2xl flex p-3 justify-between flex-col items-center">
            <div className="font-medium">Up to</div>
            <div className="text-6xl font-bold bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text">
              80%
            </div>
            <div className="font-medium">faster reading</div>
          </div>
          <div class="col-span-2 row-span-6 bg-gradient-to-br from-accent to-indigo-300 rounded-2xl flex items-center justify-center">
            <SmallLogo stroke="white" className="scale-[3]" />
          </div>
          <div class="col-span-2 row-span-3 bg-gray-200 rounded-2xl flex flex-col items-center justify-between p-6 gap-6">
            <div></div>
            <div>
              <div className=" text-5xl leading-tight bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text text-center font-bold">
                <span className="font-black">Supercharge</span>
              </div>
              <div className="text-center font-bold text-xl text-gray-800">
                your learning
              </div>
            </div>
            <div></div>
          </div>
          <div class="col-span-2 row-span-4 bg-gray-200 rounded-2xl"></div>
          <div class="col-span-1 row-span-3 bg-gray-200 rounded-2xl flex p-3 justify-between flex-col items-center py-6">
            <div className="font-medium">Up to</div>
            <div className="text-6xl font-bold bg-gradient-to-r from-accent to-indigo-400 text-transparent bg-clip-text">
              50%
            </div>
            <div className="font-medium">better understanding</div>
          </div>
          <div class="col-span-1 row-span-3 bg-gray-200 rounded-2xl"></div>
          {/* <div class="col-span-2 bg-gray-200 h-96"></div>
          <div class="col-span-1 bg-gray-200 h-40"></div>
          <div class="col-span-1 bg-gray-200 h-40"></div>
          <div class="col-span-1 bg-gray-200 h-40"></div> */}
        </div>
      </section>
    </main>
  );
}
