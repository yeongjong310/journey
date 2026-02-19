import fs from "fs";
import path from "path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  hidden?: boolean;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const raw = frontMatterLines.reduce<Record<string, string>>((acc, line) => {
    const [key, ...valueArr] = line.split(": ");
    const value = valueArr.join(": ").trim().replace(/^['"](.*)['"]$/, "$1");
    acc[key.trim()] = value;
    return acc;
  }, {});

  const metadata: Metadata = {
    title: raw.title,
    publishedAt: raw.publishedAt,
    summary: raw.summary,
    image: raw.image,
    hidden: raw.hidden === "true",
  };

  return { metadata, content };
}

function getMDXFiles(dir: string): string[] {
  const files: string[] = [];

  function traverse(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && path.extname(entry.name) === ".mdx") {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((filePath) => {
    const { metadata, content } = readMDXFile(filePath);
    const slug = path.basename(filePath, path.extname(filePath));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts(includeHidden = false) {
  const posts = getMDXData(path.join(process.cwd(), "src", "posts"));

  // development 환경에서는 includeHidden 옵션에 따라 필터링
  // production 환경에서는 항상 hidden 포스트 제외
  if (process.env.NODE_ENV === "production" || !includeHidden) {
    return posts.filter(post => !post.metadata.hidden);
  }

  return posts;
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
