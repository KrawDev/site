document.addEventListener("DOMContentLoaded", function () {
  const krawInput = document.getElementById("kraw");
  const usdInput = document.getElementById("usd");

  if (!krawInput || !usdInput) {
    console.error("⚠️ KRAW or USD input not found in the HTML.");
    return;
  }

  let currentPrice = 0;

  function formatValue(value) {
    return value === 0 ? "0" : value.toFixed(6);
  }

  async function fetchPrice() {
    try {
      const res = await fetch("https://api.dexscreener.com/latest/dex/pairs/polygon/0xd6873ea334088cf847e8fcf964db9246a17df5b2");
      const data = await res.json();
      currentPrice = parseFloat(data.pair.priceUsd);
      console.log("✅ KRAW price (USD):", currentPrice);
      usdInput.value = formatValue(parseFloat(krawInput.value) * currentPrice);
    } catch (err) {
      console.error("❌ Failed to fetch price:", err);
    }
  }

  krawInput.addEventListener("input", () => {
    if (currentPrice) {
      const kraw = parseFloat(krawInput.value) || 0;
      usdInput.value = formatValue(kraw * currentPrice);
    }
  });

  usdInput.addEventListener("input", () => {
    if (currentPrice) {
      const usd = parseFloat(usdInput.value) || 0;
      krawInput.value = formatValue(usd / currentPrice);
    }
  });

  fetchPrice();
  setInterval(fetchPrice, 30000);
});
