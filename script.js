document.addEventListener("DOMContentLoaded", function () {
  // === KRAW to USD Conversion ===
  const krawInput = document.getElementById("kraw");
  const usdInput = document.getElementById("usd");

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

      if (krawInput && usdInput) {
        usdInput.value = formatValue(parseFloat(krawInput.value || 0) * currentPrice);
      }
    } catch (err) {
      console.error("❌ Failed to fetch price:", err);
    }
  }

  if (krawInput && usdInput) {
    krawInput.addEventListener("input", () => {
      const kraw = parseFloat(krawInput.value) || 0;
      usdInput.value = formatValue(kraw * currentPrice);
    });

    usdInput.addEventListener("input", () => {
      const usd = parseFloat(usdInput.value) || 0;
      krawInput.value = formatValue(usd / currentPrice);
    });

    fetchPrice();
    setInterval(fetchPrice, 30000);
  } else {
    console.warn("⚠️ KRAW or USD input not found in the HTML.");
  }

  // === Mobile Menu Toggle ===
  const menuIcon = document.querySelector(".menu-icon");
  const navbarRight = document.getElementById("navbar-right");

  if (menuIcon && navbarRight) {
    menuIcon.addEventListener("click", () => {
      navbarRight.classList.toggle("show");
    });
  }

  // === Copy Contract Address ===
  window.copyContractAddress = function (button) {
    const address = document.getElementById("contract-address").innerText;

    navigator.clipboard.writeText(address).then(() => {
      const originalHTML = button.innerHTML;
      button.innerHTML = 'Copied!';
      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.disabled = false;
      }, 1500);
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };
});
