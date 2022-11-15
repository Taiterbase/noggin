import { getLayout as NotesLayout } from "layouts/notes"; // effectively getLayout from layouts/home
import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import bgImg from "public/circle-scatter-haikei.png";


function HomePage(props: any) {
    return (
        <div className='bg-black'>
            <Head>
                <title>noggin</title>
                <meta name="og:title" content="Noggin" key="title" />
            </Head>
            <main>
                <div className="absolute m-auto">
                    <Image 
                        src={bgImg}
                        alt={'White bubble circles'}
                    />
                </div>
                <div className='flex justify-end fixed box-border pl-25 pr-50 h-13 w-full bg-transparent backdrop-blur-sm border-b border-white'>
                    <a href='#' className='absolute left-24 top-0 leading-5 text-center'>
                        <p className='text-xl font-bold text-white'>Noggin</p>
                    </a>
                    <a href='#' className="content-end ml-7 leading-16">
                        <p className="text-white">github</p>
                    </a>
                </div>
                <div className="h-screen w-screen bg-cover bg-main-pattern p-52">
                    <p className="text-white text-xl text-center">Your new favorite Markdown Notetaker</p>
                    <p className="text-white text-xl text-center">Insert Image Here</p>
                </div> 
            </main> 
        </div>
    )
}

//HomePage.getLayout = NotesLayout;
export default HomePage;