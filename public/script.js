document.addEventListener("DOMContentLoaded", () => {
  // === KRAW to USD Conversion ===
  const kraw = document.getElementById("kraw");
  const usd = document.getElementById("usd");
  let price = 0;

  const format = v => (v === 0 ? "0" : v.toFixed(6));
  const fetchPrice = async () => {
    try {
      const res = await fetch("https://api.dexscreener.com/latest/dex/pairs/polygon/0xd6873ea334088cf847e8fcf964db9246a17df5b2");
      price = parseFloat((await res.json()).pair.priceUsd);
      console.log("✅ KRAW price (USD):", price);
      usd.value = format((parseFloat(kraw.value) || 0) * price);
    } catch (err) {
      console.error("❌ Price fetch failed:", err);
    }
  };

  if (kraw && usd) {
    kraw.oninput = () => usd.value = format((parseFloat(kraw.value) || 0) * price);
    usd.oninput = () => kraw.value = format((parseFloat(usd.value) || 0) / price);
    fetchPrice();
    setInterval(fetchPrice, 30000);
  }

  // === Mobile Menu Toggle ===
  document.querySelector(".menu-toggle")?.addEventListener("click", () => {
    document.getElementById("nav")?.classList.toggle("show");
  });

  // === Copy Contract Address ===
  window.copyContractAddress = btn => {
    const addr = document.getElementById("contract-address")?.innerText;
    if (!addr) return;

    navigator.clipboard.writeText(addr).then(() => {
      const oldHTML = btn.innerHTML;
      btn.innerHTML = "Copied!";
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = oldHTML;
        btn.disabled = false;
      }, 1500);
    }).catch(err => console.error("Copy failed:", err));
  };

  // === Roadmap Popup ===
  const popup = document.getElementById("roadmap-popup");
  document.getElementById("roadmap-popup-trigger")?.addEventListener("click", e => {
    e.preventDefault();
    popup.style.display = "flex";
  });
  document.getElementById("close-roadmap-popup")?.addEventListener("click", () => {
    popup.style.display = "none";
  });
  popup?.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });

  // === $KRAW Price ===
  async function fetchKrawPrice() {
    try {
      const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/polygon/0xd6873ea334088cf847e8fcf964db9246a17df5b2');
      const data = await response.json();
      const priceUsd = data?.pair?.priceUsd;
      const change24h = data?.pair?.priceChange?.h24;

      const priceDiv = document.getElementById("kraw-price");

      if (priceUsd) {
        let html = `
          <div class="price-main">$KRAW Price: <span class="price-value">$${parseFloat(priceUsd).toFixed(6)} USD</span></div>
        `;

        if (change24h !== undefined && change24h !== null) {
          const change = parseFloat(change24h).toFixed(2);
          const isPositive = change > 0;
          const arrow = isPositive ? '▲' : '▼';
          const className = isPositive ? 'price-change-up' : 'price-change-down';

          html += `
            <div class="price-change-wrapper">
              24h: <span class="${className}">${arrow} ${Math.abs(change)}%</span>
            </div>
          `;
        }

        priceDiv.innerHTML = html;
      } else {
        priceDiv.textContent = `Price unavailable`;
      }
    } catch (error) {
      console.error("Error fetching $KRAW price:", error);
      document.getElementById("kraw-price").textContent = `Error loading price`;
    }
  }

  fetchKrawPrice();
  setInterval(fetchKrawPrice, 30000);
});
