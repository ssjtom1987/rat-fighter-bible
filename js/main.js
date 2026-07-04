const isInSubfolder = window.location.pathname.split("/").length > 3;
const pathPrefix = isInSubfolder ? "../" : "";

async function loadPartial(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  try {
    const response = await fetch(`${pathPrefix}partials/${file}`);
    const html = await response.text();

    element.innerHTML = html;

    element.querySelectorAll("[data-link='root']").forEach((link) => {
      const href = link.getAttribute("href");
      link.setAttribute("href", `${pathPrefix}${href}`);
    });
  } catch (error) {
    console.error(`Could not load ${file}`, error);
  }
}

loadPartial("site-header", "header.html");
loadPartial("site-footer", "footer.html");