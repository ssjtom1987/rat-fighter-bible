const devPostsContainer = document.getElementById("dev-posts");

async function loadDevPosts() {
  if (!devPostsContainer) return;

  const response = await fetch("data/dev-posts.json");
  const files = await response.json();

  for (const file of files) {
    const mdResponse = await fetch(`devlogs/${file}`);
    const markdown = await mdResponse.text();

    const post = parseMarkdownPost(markdown);
    devPostsContainer.appendChild(renderPost(post));
  }
}

function parseMarkdownPost(markdown) {
  const frontMatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  let meta = {};
  let content = markdown;

  if (frontMatterMatch) {
    const metaText = frontMatterMatch[1];
    content = frontMatterMatch[2];

    metaText.split("\n").forEach(line => {
      const [key, ...valueParts] = line.split(":");
      meta[key.trim()] = valueParts.join(":").trim();
    });
  }

  return {
    title: meta.title || "Untitled Dev Log",
    date: meta.date || "",
    kicker: meta.kicker || "",
    version: meta.version || "",
    category: meta.category || "",
    tags: meta.tags || "",
    content: markdownToHtml(content)
  };
}

function markdownToHtml(markdown) {
  return markdown
    .replace(/^### (.*$)/gim, "<h4>$1</h4>")
    .replace(/^## (.*$)/gim, "<h3>$1</h3>")
    .replace(/^# (.*$)/gim, "<h2>$1</h2>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
    .replace(/^- (.*$)/gim, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gims, "<ul>$1</ul>")
    .split(/\n{2,}/)
    .map(block => {
      if (
        block.startsWith("<h2") ||
        block.startsWith("<h3") ||
        block.startsWith("<h4") ||
        block.startsWith("<ul") ||
        block.startsWith("<blockquote")
      ) {
        return block;
      }

      return `<p>${block.trim()}</p>`;
    })
    .join("");
}

function renderPost(post) {
  const article = document.createElement("article");
  article.className = "dev-post";

  article.innerHTML = `
    <div class="kicker">${post.kicker}</div>
    <h2>${post.title}</h2>

    <div class="dev-meta">
      ${post.date ? `<span>${post.date}</span>` : ""}
      ${post.version ? `<span>${post.version}</span>` : ""}
      ${post.category ? `<span>${post.category}</span>` : ""}
      ${post.tags ? `<span>${post.tags}</span>` : ""}
    </div>

    <div class="dev-content">
      ${post.content}
    </div>
  `;

  return article;
}

loadDevPosts();