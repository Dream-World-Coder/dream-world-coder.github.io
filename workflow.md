## s1. create file: `content/{slug}.md`

## s2. add meta data in yout md file for meta tags: (will not throw error if omitted)
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

## s3. update `src/app/lib/chapters.ts` : chapters & `renderedPages`

---
MOCK:
<!--metadata
  title: "title"
  authors: ["Subhajit Gorai"]
  dateCreated: "14/04/2026"
  dateEdited: "22/04/2026"
  description: ""
  tags: [""]
-->
---

> [!note]
> `slug` occurs 3 times:
>
>   1. file name: `content/{slug}.md`
>   2. index list: `src/app/lib/chapters.ts`
>   3. static params: `src/app/lib/chapters.ts` renderedPages

> [!note]
> `title` occurs 3 times:
>
>   1. In meta tag block, `title: ...`
>   2. In heading `# ...`
>   3. In index list: `src/app/lib/chapters.ts`

---

<span style="float: left; font-size: 3em; font-weight: bold; line-height: 1; margin-right: 8px;">M</span>content

write like this for cap, do not keep on newlines
