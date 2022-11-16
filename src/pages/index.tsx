import { getLayout as NotesLayout } from "layouts/notes"; // effectively getLayout from layouts/home
import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import bgImg from "public/blurry-gradient-haikei.png";
import SS from "public/nogginSS.png";


function HomePage(props: any) {
    return (
        <div className='overflow-y-scrol'>
            <Head>
                <title>noggin</title>
                <meta name="og:title" content="Noggin" key="title" />
            </Head>
            <main className="">
                <section className="absolute">
                    <Image 
                        src={bgImg}
                        alt={'White bubble circles'}
                        width={2100}
                        height={1080}
                    />
                </section>
                <section className='flex justify-end fixed box-border pl-25 pr-50 h-13 w-full bg-transparent backdrop-blur-sm border-b border-white'>
                    <a href='#' className='absolute left-24 top-0 leading-5 text-center'>
                        <p className='text-2xl font-bold text-black'>Noggin</p>
                    </a>
                    <a href='https://github.com/Taiterbase/noggin' className="content-end ml-7 leading-16 pr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill='#000000' width="50" height="50" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                </section>
                <section className="relative p-52">
                    <p className="text-black text-7xl font-bold text-center">Your new favorite Markdown Notetaker</p>
                    <div className="flex justify-center pt-8">
                        <Image 
                            src={SS}
                            alt={'Screenshot of Noggin'}
                            height={600}
                            width={700}
                        />
                    </div>
                    <div>
                        <p className="text-7xl">Hey, it's me</p>
                        <p className="text-7xl">Hey, it's me</p>
                        <p className="text-7xl">Hey, it's me</p>
                    </div>
                </section>
            </main> 
        </div>
    )
}

// HomePage.getLayout = NotesLayout;
export default HomePage;