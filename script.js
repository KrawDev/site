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

  // === NEE Popup ===
  const egg = document.querySelector('.not-easter-egg');
  const neepopup = document.getElementById('nee-js-popup');
  const closeBtn = document.getElementById('nee-close-btn');

  egg.addEventListener('click', () => {
    neepopup.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    neepopup.style.display = 'none';
  });

  // === KRAW 101 ===
  const kraw101 = document.getElementById('kraw101');
  const kraw101Popup = document.getElementById('kraw101-popup');
  const kraw101Btn = document.getElementById('kraw101-btn');
  let hoverTimer;

  kraw101.addEventListener('mouseenter', () => {
    hoverTimer = setTimeout(() => {
      kraw101Popup.style.display = 'block';
    }, 5000);
  });

  kraw101.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimer);
  });

  let tapCount = 0;
  let tapTimer;

  kraw101.addEventListener('click', () => {
    tapCount++;
    clearTimeout(tapTimer);

    tapTimer = setTimeout(() => { tapCount = 0; }, 1000);

    if (tapCount === 5) {
      kraw101Popup.style.display = 'block';
      tapCount = 0;
    }
  });

  kraw101Btn.addEventListener('click', () => {
    html2canvas(document.body, {
      width: window.innerWidth,
      height: window.innerHeight,
      x: window.scrollX,
      y: window.scrollY,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'kraw-easter-egg.png';
      link.href = canvas.toDataURL();
      link.click();

      kraw101Popup.style.display = 'none';
    });
  });

    kraw101Popup.addEventListener('click', (e) => {
    if (e.target === kraw101Popup) {
      kraw101Popup.style.display = 'none';
    }
  });

});
