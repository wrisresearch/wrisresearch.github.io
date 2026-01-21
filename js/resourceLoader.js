document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const route = params.get("route"); // get JSON path

  if (!route) {
    document.querySelector(".main-content").innerHTML =
      "<p>No resource selected.</p>";
    return;
  }

  try {
    const res = await fetch(route);
    const data = await res.json();

    const sidebar = document.querySelector(".table-of-content .main-menu");
    const content = document.querySelector(".main-content");

    // Resource title
    const headingLi = document.createElement("li");
    headingLi.className = "menu-sub-heading";
    headingLi.textContent = data.title;
    sidebar.appendChild(headingLi);

    // Sections
    const subMenu = document.createElement("ul");
    subMenu.className = "sub-menu";

    data.sections.forEach(section => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = section.name;

      link.addEventListener("click", async e => {
        e.preventDefault();
        const html = await fetch(section.file).then(r => r.text());
        content.innerHTML = html;
        content.scrollTop = 0;
      });

      li.appendChild(link);
      subMenu.appendChild(li);
    });

    sidebar.appendChild(subMenu);

    // Auto-load first section
    if (data.sections.length) {
      const firstHtml = await fetch(data.sections[0].file).then(r =>
        r.text()
      );
      content.innerHTML = firstHtml;
    }
  } catch (err) {
    console.error("Failed to load resource:", err);
    document.querySelector(".main-content").innerHTML =
      "<p>Failed to load resource.</p>";
  }
});

link.addEventListener("click", async e => {
  e.preventDefault();

  const content = document.querySelector(".main-content");

  // Start fade out
  content.classList.add("fade-out");

  // Wait for fade out to finish
  setTimeout(async () => {
    const html = await fetch(section.file).then(r => r.text());
    content.innerHTML = html;

    // Fade back in
    content.classList.remove("fade-out");
    content.classList.add("fade-in");

    // Optional: remove fade-in class after animation to reset
    setTimeout(() => {
      content.classList.remove("fade-in");
    }, 400);
  }, 200); // fade-out duration slightly shorter than transition for smoothness
});
