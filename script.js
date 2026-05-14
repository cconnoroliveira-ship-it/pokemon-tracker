// Replace this with YOUR Worker URL
const DATA_URL = "https://poke-tracker.cconnoroliveira.workers.dev";
;

async function loadData() {
  try {
    const res = await fetch(DATA_URL);
    const data = await res.json();

    document.getElementById("updated").textContent =
      "Last Updated: " + data.lastUpdated;

    const container = document.getElementById("packs");
    container.innerHTML = "";

    data.packs.forEach(pack => {
      const div = document.createElement("div");
      div.className = "pack";
      div.innerHTML = `
        <h2>${pack.name}</h2>
        <p>Pack Cost: $${pack.packCost}</p>
        <p>Rare Chance: ${(pack.rareChance * 100).toFixed(2)}%</p>
        <p>Avg Rare Value: $${pack.avgRareValue.toFixed(2)}</p>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    document.getElementById("updated").textContent = "Error loading data";
  }
}

loadData();
setInterval(loadData, 30000);
