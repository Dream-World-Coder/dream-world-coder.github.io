export interface ProjectData {
    title: string;
    period?: string; //"Dec 2025 – present"
    stack?: string;
    links: {
        label: string;
        href: string;
    }[];
    description: string;
}

export const projects: ProjectData[] = [
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
        I tried doing it for Bangla Poems. Had to apply lots of tricks but surprisingly Dijkstra came in very handy in it too.
        Poem can be thought of a shortest path too, in a map where your buildings are entities and regions are emotions.
        Every-way you connect them is meaningful, if you apply your constraints properly. And afterwards that, poem is constraint satisfaction mostly.
        Genuinely liked working on this. <br/>
        Had to make the repo private for some reasons. But the documentation is more than sufficient for everything, if you wanna dive in.`,
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
        description: `ArXiv is too stiff, Medium is too loose, and there is nowhere to publish a half
        formed research idea to people who will actually love discussing on it. OpenCanvas sits between a
        preprint and a tweet thread, a place for early stage work that is ideologically valuable
        but not yet polished. It also aggregates metadata from 25+ institutions so you can browse
        papers without drowning in Google Scholar.<br/>
        Due to obsession, had to optimise the backend to the highest extend I could. Used MERN only.
        Achieved 17,007 RPS on a 1.4Mn+ document collection on the feed route itself.
        <br/>
        Built for over 1.2 years & wrote 22,000+ lines myself. And yeah, understood TS & SDLC need in super hard way.`,
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
        Dijkstra, Floyed Warshall -- are my personal favourites.
        <br/>
        ★ On a personal note this is my first repo that completed 10 github stars :) ★`,
    },
];
