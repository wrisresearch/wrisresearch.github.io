async function loadUpdates() {
  const res = await fetch("../assets/updates.json");
  return res.json();
}

function unique(arr) {
  return [...new Set(arr)];
}

function renderStats(items) {
  document.getElementById("stat-total").textContent = items.length;
  document.getElementById("stat-categories").textContent =
    unique(items.map(i => i.category)).length;
  document.getElementById("stat-featured").textContent =
    items.filter(i => i.featured).length;
  document.getElementById("stat-tags").textContent =
    unique(items.flatMap(i => i.tags)).length;
}

function card(item) {
  return `
    <article data-category="${item.category}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="meta">
        <span>${item.category}</span>
        <span>${new Date(item.date).toLocaleDateString()}</span>
      </div>
    </article>
  `;
}

function renderGrid(el, items) {
  el.innerHTML = items.map(card).join("");
}

function setupFilters(items) {
  const filters = document.getElementById("filters");
  const categories = ["All", ...unique(items.map(i => i.category))];

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => {
      const filtered =
        cat === "All" ? items : items.filter(i => i.category === cat);
      renderGrid(document.getElementById("updates-grid"), filtered);
      document
        .getElementById("no-results")
        .classList.toggle("hidden", filtered.length > 0);
    };
    filters.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const items = (await loadUpdates()).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  renderStats(items);
  renderGrid(document.getElementById("updates-grid"), items);
  setupFilters(items);

  const featured = items.filter(i => i.featured).slice(0, 2);
  if (featured.length) {
    renderGrid(document.getElementById("featured-grid"), featured);
  }
});
