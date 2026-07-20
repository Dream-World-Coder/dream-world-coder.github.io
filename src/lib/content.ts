import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");
const chaptersDir = path.join(contentDirectory, "chapters");

// dfs traverse
function getAllFiles(dir: string, fileList: string[] = []): string[] {
    if (!fs.existsSync(dir)) return fileList;

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else if (file.endsWith(".md")) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

// get a map of slug -> file path and catch conflicts
export function getFileMap(): Map<string, string> {
    const allFiles = getAllFiles(chaptersDir);
    const fileMap = new Map<string, string>();

    for (const file of allFiles) {
        const slug = path.basename(file, ".md");

        if (fileMap.has(slug)) {
            throw new Error(
                `Duplicate filename conflict detected for "${slug}.md".\nFiles found at:\n1) ${fileMap.get(slug)}\n2) ${file}`,
            );
        }
        fileMap.set(slug, file);
    }
    return fileMap;
}

export function getChapterContent(slug?: string | string[]): string {
    if (!slug) return `# Enter a valid url`;

    const fileMap = getFileMap();
    const filePath = fileMap.get(slug as string);

    if (!filePath) {
        return `# Chapter Not Found\n\nThe chapter "${slug}" doesn't exist yet.`;
    }

    try {
        return fs.readFileSync(filePath, "utf-8");
    } catch (error) {
        console.error(error);
        return `# Error Loading Chapter\n\nCould not read "${slug}".`;
    }
}

export function getAllChapterSlugs(): string[] {
    const fileMap = getFileMap();
    return Array.from(fileMap.keys());
}
