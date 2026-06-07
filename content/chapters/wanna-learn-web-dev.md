<!--metadata
  title: "Wanna Learn Web Development?"
  authors: ["Subhajit Gorai"]
  dateCreated: "29/05/2026"
  dateEdited: "07/06/2026"
  description: "Detailed guide & resources for Web Development."
  tags: ["web-dev"]
  slug: "wanna-learn-web-dev"
-->

# Wanna Learn Web Development?

So you want to start web dev. Nice :)
What kind of developer you wanna be? 

You got inspired by some great 3D, WebGL website on [awwwards](https://www.awwwards.com) and now wanna see yourself doing the same... **Creative Developer / Design Engineer / Frontend Engineer**

You are thrilled with backend systems and wanna design a highly scalable site capable of handling millions of concurrent requests... **Backend Engineer / Distributed Systems Engineer / Site Reliability Engineer (SRE)**

You wanna develop something, build your own, or maybe build every dev aspect like a **Fullstack Engineer**

Or maybe you are into machine learning or other domains and wanna deploy something real quick. **Project Need**

Find the one which best suits you.

If it is **Project Need** then you don't have to spend your time learning web dev things. Right now lots of frameworks and AI tools exist. Give a good prompt, tell your target requirement specifically, tell the AI not to overdo it, and it will be done. My suggestion is to focus on your main project goal, not the presentation.

Also worth noting: I mentioned some general and specialised resources but this might not be the best article if you are into a serious guide on how to make "awwwards level designs and sites". My journey is Fullstack/SRE kind. So it's prone to those aspects.


## Must Know for Everyone

HTML, CSS, JS -> Must learn

Initially have an idea of HTML and CSS, learn basic things only. You will learn other things while developing projects. Don't try to do it all from the start.

#### <u>First HTML</u>
**quick guide:** Bro Code is what I followed as it was short. You can watch [any](https://www.youtube.com/results?search_query=html+tutorial). 
[Bro code html](https://youtu.be/HD13eq_Pmp8?si=4g6dJOpcw6TY1LkA), [apna college](https://youtu.be/HcOc7P5BMi4?si=N_Oh20h-e3z8rT5d)
**best for in depth:** https://web.dev/learn/html/ [go through some of it at first]

Have clarity on basic tags like h tags, p, div, span, code, pre, strong
ul, ol, li etc. Also some basic meta tags. like viewport, title, description, icon, link tags etc etc. **And always follow the semantics and proper order of tags.**

Here's a basic boilerplate.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
    
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    
    <h1>Hello, World!</h1>

    <script src="script.js"></script>
  </body>
</html>
```

> For `vs code` download some extension for getting boilerplate code. In `zed` it already exists. `!+enter / !+tab`


---

#### <u>Then CSS</u>
It's vast. Here it's important that you don't try to go through all of it at first. It's inefficient and not fun that way. You will learn with projects.

**quick guide:** [bro code](https://youtu.be/wRNinF7YQqQ?si=l5UZCNRdV5Ulsqr6)
**best playlist:** covers things that are vastly sufficient, like layouting, positioning, flexbox, grid etc. [slaying the dragon](https://www.youtube.com/playlist?list=PLlKKnT3UqNu0RWvCCZBnSPfhsepQ5BYN3)
**detailed docs:** https://web.dev/learn/css, mdn docs, w3school

learn [SCSS](https://sass-lang.com/guide/) and [Tailwind](https://tailwindcss.com/docs/styling-with-utility-classes) too. Those are simple and at most will take an hour each for understanding. Ask any AI to reference them.

> If you make fairly large projects you will understand why Tailwind is a lifesaver. You'll enjoy it.

*so, how to center a div? (qn for you)* 


---

#### <u>Now JavaScript</u>
This is the most vital, and it's gonna be of super use. Do not skip and jump to React unless you are comfortable in it. Previous HTML, CSS can be done in a day but here spend one week at minimum. It will take 1-6 weeks depending on your current programming knowledge.

> note: you need to properly understand [Object Oriented Programming](https://www.geeksforgeeks.org/dsa/introduction-of-object-oriented-programming/) for this.

**best:** https://web.dev/learn/javascript
**good if you don't like reading:** [chai or code js playlist](https://www.youtube.com/playlist?list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37)

Must have clarity with anonymous functions, objects, destructuring, realms, prototypal inheritance, js execution, event loop, task queue, micro task queue, promises in JS.
also know IIFE, closures and similar things. 

These visualisations by [Lydia](https://www.youtube.com/@theavocoder/videos) are great: [event loop](https://youtu.be/eiC58R16hb8?si=j2F8h26JJq79flJH), [closures](https://youtu.be/6Ixyltr8_R0?si=qYVutzMD413Dv1uA), [execution context](https://youtu.be/zdGfo6I1yrA?si=vonj32EKP2JvREK4), [promise execution](https://youtu.be/Xs1EMmBLpn4?si=Ryv889XU9P4o6eZ_)

Now, Document Object Model (DOM) is an essential part for web dev. You can learn it from anywhere. My recommendations will be: [designcourse](https://www.youtube.com/watch?v=aewQJ-sK9SU), [apna college](https://youtu.be/7zcXPCt8Ck0?si=OyeWAPwYUQsEKzP7)

---

<u>Quick project:</u>
After learning HTML, CSS and JS make sure to build something with it. It's vital. I recommend this: https://www.youtube.com/watch?v=QRrPE9aj3wI&t=2s (html, css)
Or anything you wish. But do make.


> Getting less popular in vibe coding era, but here are some icon libraries you'll need for sure while building projects with html & css.
> 
>**svgrepo**: https://www.svgrepo.com
> **hero icons**: https://heroicons.com
> **lucide**: https://lucide.dev



Now that HTML, CSS and JS are done and if you honestly didn't skip JS, you are already a good web developer. Not kidding.

It's good to have some knowledge on browser internals for everyone, maybe watch this: https://youtu.be/5rLFYtXHo9s?si=KaUl08CMwBSbqsSv
For more go to the frontend section below.

---

## Specialisation

Now there is no such bound here, like "for frontend learn all of this, for backend that". No. You can pick any tech from both frontend and backend sides. It's a mix.
Your specialisation will be on your depth of knowledge in the technologies you chose.

So here I'm listing the best resources I found.

### Frontend

#### <u>React</u>
https://react.dev (best source, nothing else needed). Have clarity on useState, useEffect, useRef, useContext, useMemo.

`chai or code` react playlist is also good.
https://youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&si=jY8G_EIAS5Iva5jT this is fine too. Search on YT, watch any.

Must learn [Tanstack](https://tanstack.com) alongside it. 
- [tanstack](https://youtu.be/Ua__7-x6MWs?si=tH5QcJGCZg6eXUqW)
- [tanstack query](https://youtu.be/mPaCnwpFvZY?si=k54m3Y5GLDV59riF)

**State management**: Once your app grows, prop drilling gets painful. useState alone stops scaling.

Options: Zustand, Redux Toolkit, Jotai. For most projects Zustand is the right choice. Minimal API, no boilerplate. Redux only makes sense if the team is large or the state is genuinely complex. Jotai if you want atomic granularity.

> Don't add state management until you actually need it. Premature abstraction gets problematic.

---

#### <u>Routing</u>
React Router v6 is standard. Have clarity on nested routes, loaders, and the difference between client-side and server-side navigation. Check HashRouter too.

#### <u>Browser internals</u>

Important, not optional. 
Understand the event loop, call stack, task queue, microtask queue. Async JS knowledge should be concrete. Knowing why `Promise.then` fires before `setTimeout` matters when you're debugging real bugs.

How the render pipeline, hydration works (`parse HTML -> build DOM -> CSSOM -> layout -> paint -> composite`). This directly helps you write performant UI.

Repaint vs reflow. Avoiding layout thrash. These come up.

check https://browser.engineering, it's really great.

---

#### <u>PWAs</u>

Now you can have almost app like experience with dev skills only. Progressive Web Applications are for this. Try adding a simple `manifest.json` and you'll see the difference.

Best source to learn more: [web.dev](https://web.dev/articles/what-are-pwas)

Also you can use **capacitor.js** etc frameworks to haven an proper android apk.

some useful sites for generating pwa icons:
- https://icon-gen.netlify.app
- https://www.pwabuilder.com/imageGenerator
- https://icon.kitchen
- https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

some for pwa to apk:
- [pwabuilder](https://www.pwabuilder.com)

---

> not necessary if you are just starting

#### <u>TypeScript</u>

When working with large react projects you will understand the need of type safety in React. TS saves you from this fustration. Its a superset of JS.

Core things to have clarity on: primitive types, interfaces vs types, generics, utility types (Partial, Pick, Omit, Record), and how to type props and hooks in React.

Sources:
- best: [TS Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- for React specifically: [Total TypeScript by Matt Pocock](https://www.totaltypescript.com/), he has free tutorials and they are genuinely the best on typing React components, hooks, and event handlers.
- for practice, make projects, you can use this too, its great. https://github.com/type-challenges/type-challenges

---

> Safe to skip for starters

#### <u>IndexedDB</u>

In case you need more than ~5 MB of your Local Storage, this gives you a lot more. Async and no sql.
Dexie is a great wrapper for it: [dexie.js](https://dexie.org)

---

> Definitely skip if you are just starting

#### <u>WebAssembly (WASM)</u>
When JS performance is a bottleneck. Image processing, audio, physics simulation, in-browser ML inference. If you know Rust you can compile to WASM and call it from JS. The interop is straightforward.

Most projects don't need it. 

> If you want a real hands-on target: take a computationally heavy function you've written in JS, rewrite it in Rust, compile to WASM, and benchmark the difference. You'll never forget what WASM is for.

---

#### <u>animations</u> 

Its honestly not my turf. Suggestion would be if you want motion, look into Framer Motion for React. GSAP if you want timeline control. Three.js / React Three Fiber for 3D. These are rabbit holes, go in only if that's your direction.

---

### Backend

Here DSA & DEV intersects. Try buillding any core backend tech from scratch. You are gonna love it. 

#### <u>SQL and DBMS</u>
Understand joins deeply, understand indexing (clustered vs non-clustered, when composite indexes help), understand query plans.
Have clear idea of Normalization & Denormalization, use based on requirements.

Learning PostgreSQL is best for now. MySQL is fine too but Postgres has better extensions, better JSON support, better window functions.

resources: https://www.postgresqltutorial.com, CMU 15-445 lectures on YouTube for depth.

---

#### <u>MongoDB</u>
Do SQL first. Then only you will get this properly. Good for flexible schema, rapid prototyping, and when your data is naturally hierarchical.

Dont use MongoDB only to avoid schema design. That's not a valid reason. If your data is relational, use a relational DB.

sufficient: [engineering digest playlist](https://www.youtube.com/watch?v=4EjKroJCpFA&list=PLA3GkZPtsafZydhN4nP0h7hw7PQuLsBv1)

Have clarity on:  Query operators like $match, $group, $lookup, $unwind, aggregation pipelines. 
Go through mongoose & mongodb client. 

The data objects returned by mongoose have to go through hydration which takes time and can be a bottleneck for high throughput / rps. Use lean in those cases to make data retrival much faster. Aggregation pipelines do it by default.

Here is one of my repo to see production ready use: [opencanvas backend](https://github.com/Dream-World-Coder/opencanvas/tree/main/server/src)

---

#### <u>Flask</u>

Finally, some proper web development framework right? after all that...
Flask is the best framework I have personally worked with. It is tidy, sufficient, has everything, you have proper customisation. Truely gold. But it was rabit hole for me. See how it works out for you. 

Learn flask in depth, rest will be very easy to get then afterwards.

**core things to have clarity upon:** request response cycle, templating, file serving, request handling, user session, cookies, csrf/xss etc common attacks, blueprints and factory pattern and database integration, migrations

Trust me. knowing these in flask, you will understand any framework. Everything will be relateable.

sources: 
- [Corey Schafer's playlist](https://www.youtube.com/playlist?list=PL-osiE80TeTs4UjLw5MM6OjgkjFeUxCYH)
- docs: https://flask.palletsprojects.com/en/stable/
- sqlalchemy docs: https://docs.sqlalchemy.org/en/20/intro.html

mrigul grinberg's book is excellent. Give it a read, on portions you need clarity: [web version](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world), [pdf](https://github.com/Dream-World-Coder/dev-resources)

---

#### <u>FastAPI</u> 

* **[Official FastAPI Documentation](https://fastapi.tiangolo.com)**: Good, interactive guide covering basics to advanced topics like dependency injection and security.
* **[Fastapi-users](https://fastapi-users.github.io/fastapi-users/)**: Library for ready to use registration and authentication systems.

Production Templates & Architecture

* **[Full Stack FastAPI Template](https://github.com/fastapi/full-stack-fastapi-template)**: Official boilerplate by fastapi creator showing FastAPI, PostgreSQL, Docker, and frontend integration.
* **[FastAPI Best Practices](https://github.com/zhanymkanov/fastapi-best-practices)**

---

> I recommend learning Flask or Other Frameworks first

#### <u>Django</u> 

Flask is a lightweight micro framework that relies on a collection of external modules, whereas Django provides a complete ecosystem, often said as "batteries-included".

Core Resources

* **[Official Django Documentation](https://docs.djangoproject.com/)**: Best reference for Django, featuring detailed explanations of the ORM, routing, and security features.
* **[Django REST Framework (DRF)](https://www.django-rest-framework.org/)**: Standard toolkit for building Web APIs on top of Django.

Production Templates & Architecture

* **[Cookiecutter Django](https://github.com/cookiecutter/cookiecutter-django)**: Most popular framework for jumpstarting production ready Django projects quickly. 

* **[HackSoft Django Styleguide](https://github.com/HackSoftware/Django-Styleguide)**: Great set of rules and architectural patterns that separate business logic from models and views for large scale Django apps.


---

#### <u>Express</u>

Official & Core Resources

* **[Official Express Documentation](https://expressjs.com/)**: Best guide for routing, middleware, and request handling.

Production Templates & Architecture

* **[Node Express Boilerplate by hagopj13](https://github.com/hagopj13/node-express-boilerplate)**:  Featuring built in JWT authentication, Jest testing, Docker support, and a centralized error handling.
* **[Node.js Boilerplate by foyzulkarim](https://github.com/foyzulkarim/nodejs-boilerplate)**:  Best practices for folder architecture, modular routing, and clean code separation.


[Building a Production Ready Node.js Boilerplate](https://www.youtube.com/watch?v=6_wfq76CG6g)
This is good. Give it a watch if facing trouble understanding.

Also here is one of my repo to see production ready use: [opencanvas backend](https://github.com/Dream-World-Coder/opencanvas/tree/main/server/src)


------

> Skip for Starters

#### <u>System design</u>
This is something people treat as interview prep only. Don't do that.
Have genuine clarity on:
- when to use serverless (bursty traffic, low baseline, short execution time). Consider cold starts. Do not use serverless for latency sensitive always on services.
- horizontal vs vertical scaling 
- rate limiting, API gateways, load balancers, cdns

--- 
#### <u>Redis</u>

- chai or code: https://youtu.be/5YqP18Gyop0?si=H3BC7GZjKuQzX9-w
- web dev simplified: https://youtu.be/jgpVdJB2sKQ?si=TX4njkS6h_tf6vh-

real situation example: Read through this section. You will understand the need of redis in real environment. https://www.opencanvas.institute/p/from-1993-to-17007-requests-per-second-how-i-optimised-a-nodejs-mongodb-backend-at-scale-69ad48fc4684635da9b4c72c#7-in-memory-ttl-cache-with-intelligent-invalidation

--- 

#### <u>Next.js</u>

React but with SSR (server side rendering) and SSG (static site generation) built in. Use it when:
- SEO matters (rendered HTML, not just husk)
- You want your frontend and lightweight API routes in one codebase
- You're building a content heavy site

Right now its getting used everywhere. But don't use it just because of that. If SEO doesn't matter and you don't need SSR, a plain React SPA is simpler and easier to reason about.

sources:
- official next js docs are the best: https://nextjs.org/docs
- https://nextjs.org/learn/dashboard-app

---

## Deployment

Deploying is the most awaited part. The desire to see your work on a live url is insane after completing a project. But it gets really messy sometimes. You dont find appropriate free plans, errors just keep popping out of nowhere. That's why you need to have some knowledge on production environments and practices. Discussing all that here will make it long. So for now let's be aware with these platforms briefly. I'll link a seperate article on common error fixes, troubleshooting etc here.

- **GitHub**: Best for static html css based sites and supports React etc SPAs too.
- **Vercel**: Best for Next.js and any frontend based project. Free analytics.
- **Netlify**: Similar to Vercel for static sites. I dont like it as it charges for analytics.
- **CloudFlare**: cloudflare workers and pagers are also great.

- **PythonAnywhere**: Best for small (less than 512mb) Flask/Django projects. Free tier is genuinely good. No Docker needed. 
- **Railway**: They give 5$ credit for new accounts. So if you need quick demo for a short period you can get everything for free here. Its almost the new Heroku.
- **HuggingFace Spaces**: For ML demos and Gradio/Streamlit apps. If you want to show a model working, this is the fastest path.
- **VPS (DigitalOcean, Hetzner, Linode)**: When you need actual control. 

- **Docker**: Learn it. Not optional if you're serious. Containerising your apps means your deployment is reproducible regardless of where it runs. `Dockerfile`, `docker-compose`, basic networking between containers. That's sufficient to start.

---

One last thing.

The best engineers I've seen around me didn't learn the most tools. They got very good at a small set of things, built actual projects, and read enough to understand what was happening under the surface. The intersection of knowing your data structures and knowing your system is where the interesting problems live. 

Best of luck 🍀
Keep building!
