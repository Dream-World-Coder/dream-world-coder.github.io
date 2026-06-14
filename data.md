## s1. create file: `content/{slug}.md`

## s2. add meta data in yout md file for meta tags:
```txt
<!--metadata
  title: "" !required
  subtitle: ""
  description: "" !required
  tags: ["", ""] !required
  category: ""

  authors: ["",""] !required

  dateCreated: "dd/mm/yyyy" !required
  dateEdited: "dd/mm/yyyy" !required 
  version: "1.0"
  draft: false

  slug: ""
  readingTime: ""
  language: "en"
-->
```

## s3. update `src/app/lib/chapters.ts`
## s4. update generateStaticParams in `src/app/chapter/[slug]/page.tsx`

> [!note]
> `slug` occurs 3 times:
>
>   1. file name: content/{slug}.md
>   2. index list: src/app/lib/chapters.ts
>   3. static params: src/app/chapter/[slug]/page.tsx

> [!note]
> `slug` occurs 3 times:
>
> > 1. file name: content/{slug}.md
> > 2. index list: src/app/lib/chapters.ts
> > 3. static params: src/app/chapter/[slug]/page.tsx
