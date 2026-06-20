export interface ActivityData {
    title: string;
    period?: string; //"Dec 2025 – present"
    stack?: string;
    links: {
        label: string;
        href: string;
    }[];
    description: string;
}

export const activityData: ActivityData[] = [
    {
        title: "LampLight",
        links: [{ label: "github", href: "" }],
        description: "In making",
    },

    {
        title: "Depuzzled",
        links: [
            {
                label: "github",
                href: "https://github.com/Dream-World-Coder/depuzzled",
            },
        ],
        description: `C++ Klotski engine in 739bits.<br/>
        Inspired by a junior. [link]`,
    },

    {
        title: "Computable Poetry",
        stack: "NLP | Formal Grammars | Graph Theory | Constraint Satisfaction",
        links: [
            {
                label: "Documentation",
                href: "https://computable-poetry.vercel.app",
            },
            // {
            //     label: "github",
            //     href: "https://github.com/Dream-World-Coder/computable_poetry",
            // },
            // { label: "paper", href: "" },
        ],
        description: `Can we generate meaningful poetry without any Machine Learning?
        I tried doing it for Bangla Poems. Had to apply lots of tricks but surprisingly Dijkstra came in very handy in it.
        It appears, a Poem can be thought of a shortest path too; in a map where your buildings are entities and regions are emotions.
        Every-way you connect them becomes in a way meaningful.
        And afterwards, creating a Poem from that is just language specific constraint satisfaction, mostly.<br/>

        Genuinely liked working on this.
        Had to make the repo private for some reasons.
        But the documentation is more than sufficient, if you want to dive in.`,
    },

    {
        title: "OpenCanvas",
        stack: "MERN",
        links: [
            {
                label: "live",
                href: "https://opencanvas.institute",
            },
            {
                label: "github",
                href: "https://github.com/Dream-World-Coder/opencanvas",
            },
        ],
        description: `You are onto something. You like re-discovering, thinking.
        For some of your ideas you want to discuss with others, you want to share with like minded people.
        So what are your options? Reddit, X, Medium, HackerNews...
        These are definitely great places. But they are generalised. Not a focused academic platform only.
        Alternatives: ArXiv, ResearchGate etc. But these are too stiff in general.
        You cannot publish your half formed ideas in here. Which is needed for the purpose they are serving.
        So thats why I made OpenCanvas. It sits just in the middle of these.
        Pure academia, no distractions, targeted audience -- just as needed.
        Also it aggregates lots of papers, publications etc meta data from 50+ institutions.
        From even individual college & university sites too. So theres no need to scatter search, and also everything
        is threaded -- have discussion on every one of them, right under the source.
        Also a very loving UI that your eyes will get comfortable with. So these are all which OpenCanvas incorporates.
        Definitely check out this one. <br/><br/>

        And yes, due to obsession, had to optimise the backend to the highest extent I could. Used MERN only.
        For the feed route, achieved 6138 RPS (TTL cache enabled), and around ~3k RPS
        (Cache disabled, DB querying everytime) in Node.js single thread.
        Seeded the db collections with millions of documents for testing.
        In pm2 cluster mode, in my MacOS (8 cores), the RPS increased to 17K-20k range. <br/><br/>

        Developed it for over a year & wrote 22,000+ lines myself. Realised TypeScript & SDLC need in super hard way.<br/>
        > On a personal note, this is my first repo that had global contributors :)`,
    },

    {
        title: "DSA Animations",
        period: "Jul 2024 – present",
        stack: "React · Vite · Tailwind CSS · shadcn/ui · Algorithm Visualization",
        links: [
            {
                label: "live",
                href: "https://dsa-experiments.vercel.app",
            },
            {
                label: "github",
                href: "https://github.com/Dream-World-Coder/DSA_Animations",
            },
        ],
        description: `An interactive animations site for visualizing some awesome algorithms.
        There are around 17 of them, as far as I remember. Tower Of Hanoi, Tortoise and Hare Technique,
        Dijkstra, Floyd Warshall -- are my personal favourites. Do check out if you have a keen interest in these.<br/>

        ★ On a personal note this is my first repo that completed 10 github stars :) ★`,
    },
];
