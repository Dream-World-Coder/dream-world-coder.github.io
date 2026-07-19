import { CornerPlusIcons } from "@/components/Decorum";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    return (
        <div className="flex md:items-center justify-center size-full h-screen py-4 md:py-0">
            <section
                className="h-full md:h-[80vh] w-[90dvw] max-w-[1368px] _bg-[#f8f8f8] bg-white dark:bg-neutral-900 text-black dark:text-[#f8f8f8]
                    border border-dashed border-neutral-300/80 dark:border-neutral-700/80 p-6 py-10
                    flex flex-col justify-start items-center relative"
            >
                <h1 className="md:font-serif capitalize text-3xl text-center mt-20 md:mt-0">
                    The Invariant;
                </h1>

                <h1 className="font-mono capitalize text-center mt-16 md:mt-12 max-w-[30ch] md:max-w-none leading-tight">
                    On the algebra of algorithms, the structure of proofs, and{" "}
                    <br />
                    the assumptions hiding inside physics.
                </h1>

                <p className="my-2 font-mono">
                    by{" "}
                    <Link
                        href="/author"
                        className="italic underline decoration-dashed"
                    >
                        Subhajit Gorai
                    </Link>
                </p>

                <div className="diagram front-cover my-10">
                    <Image src="/f2.png" alt="graph" width={160} height={212} />
                </div>

                <Link
                    href="/chapters"
                    className="mt-6 px-6 py-2 font-mono rounded-2xl
                    bg-stone-100 text-neutral-600 hover:text-neutral-900
                    dark:bg-stone-800 dark:text-neutral-300 dark:hover:text-neutral-50
                    border-b border-r border-stone-300 dark:border-stone-700 hover:border-b-2 hover:border-r-2"
                >
                    Start Reading
                </Link>

                <CornerPlusIcons />
            </section>
        </div>
    );
}
