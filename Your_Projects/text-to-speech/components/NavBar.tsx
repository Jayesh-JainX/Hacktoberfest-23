import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

export default function NavBar() {
  return (
    <div className="flex items-center justify-around bg-slate-700 shadow-lg drop-shadow-md py-3">
      <h1 className="text-md md:text-lg ">Text-to-Speech Converter</h1>
      <div className="flex items-center justify-center  gap-3 md:gap-12  text-xs md:text-base ">
        <Link
          href={"https://github.com/r0ld3x/text-to-speech-app"}
          className="flex hover:text-slate-500 transition-all duration-300 ease-linear items-center"
        >
          <Github />
          Github
        </Link>
        <Link
          href={"https://github.com/r0ld3x/"}
          className="flex hover:text-slate-500 transition-all duration-300 ease-linear items-center"
        >
          <ExternalLink />
          Owner
        </Link>
      </div>
    </div>
  );
}
