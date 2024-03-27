import { AtSign, FileBadge, Github, Home, Instagram, PocketKnife } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function Index() {

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>James Mowat</title>
        <link rel="icon" href="/jmlogo.svg" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>
      <div className="h-screen w-full bg-zinc-50">

        <div className="w-full h-screen flex items-center justify-center">

          <div>
            <ol className="text-zinc-800 font-sans-[Inter_var] flex flex-col gap-2 text-xl">
              <li><span className="font-semibold">Hi</span>, I'm James</li>
              <li>Software is <span className="bg-gradient-to-r from-cyan-500 via-violet-900 to-pink-400 bg-clip-text text-transparent">boring</span></li>
              <Link href={"https://note.suddsy.dev/"}><li>Latest project: <span className="font-semibold">Note</span></li></Link>
            </ol>
          </div>

        </div>

        <div className="flex items-center gap-2 fixed bottom-2 right-2 text-blue-300">
          <Link aria-label="cv" target="_blank" href={"mailto:james@suddsy.dev"}>
            <AtSign />
          </Link>
          <Link aria-label="github profile" target="_blank" href={"https://github.com/jfmow"}>
            <Github />
          </Link>
        </div>


      </div>

    </>
  )
}

