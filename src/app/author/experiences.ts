export const experienceData = [
    {
        role: "Research Intern",
        org: "Chennai Mathematical Institute",
        detail: `ML (PAC, VC-Dimensions, NN, DNN, CNN, RNN, LSTM, Generative Adversarial Networks,
        Reinforcement Learning, Markov Decision Process: Policy evaluation,
        policy iteration, value iteration & Monte Carlo methods, Dynamic Programming Methods for RL,
        Temporal Difference Learning, Deep Reinforcement Learning, Bayesian Optimization, Gaussian Process Regression),
        LLM(Encoders, Attentions, Transformers), Embedding Space, Unified Learning Paradigms,
        Matryoshka Representation Learning, EmbeddingGemma, Model Soups, Contrastive Losses (NCE), Model Distillations,
        Global Orthogonal Regularizer.`,
        link: "www.cmi.ac.in",
    },
    {
        role: "Advanced Application Engineering Analyst Intern (AEH)",
        org: "Accenture",
        detail: "Software Engineering, Data WareHousing, Data Modelling, Fact, Dimension, Normalisation, Star, Snowflake schema, SCD, Oracle Application Cloud, ETL, OLAP & OLTT",
        link: "accenture.com",
    },
    {
        role: "Research Fellow",
        org: "TEXMiN IIT(ISM) Dhanbad, NM-ICPS",
        detail: "Making a hazard prediction system for coal mines, using ML & CPS.",
        link: "texmin.in",
    },
    {
        role: "Web Development Lead",
        org: "CODEIIEST, IIEST Shibpur",
        detail: `Had some interesting sessions with fellow _BEings_.
        Managed development of lots of club & event sites.
        Co developed the official students senate site.`,
        link: "codeiiest.in",
    },
] satisfies { role: string; org: string; detail: string; link: string }[];
