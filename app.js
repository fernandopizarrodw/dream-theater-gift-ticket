(function () {
  const $ = (id) => document.getElementById(id);

  const defaults = {
    name: "Valery Luthien",
    month: "April",
    year: "2026",
    city: "Buenos Aires",
    venue: "Movistar Arena, Buenos Aires",
    giftedBy: "FMD",
  };

  function getParam(key) {
    const url = new URL(window.location.href);
    const v = url.searchParams.get(key);
    return v && v.trim() ? v.trim() : null;
  }

  function safeUpper(s) {
    return String(s || "").toUpperCase();
  }

  function slug3(s) {
    // build a 3-letter-ish city code, fallback ARG
    const clean = String(s || "").replace(/[^a-zA-Z]/g, "");
    if (clean.length >= 3) return clean.slice(0, 3).toUpperCase();
    return "ARG";
  }

  function makeCode(city, year, name) {
    const c = slug3(city);
    const y = String(year || "").replace(/\D/g, "").slice(-2) || "26";
    const n = String(name || "").replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase() || "VIP";
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `DT-${c}-${y}${n}-${rand}`;
  }

  function buildExampleUrl(params) {
    const u = new URL(window.location.href);
    u.search = "";
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
    return u.toString();
  }

  function showToast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    window.clearTimeout(showToast._tm);
    showToast._tm = window.setTimeout(() => t.classList.remove("show"), 1800);
  }

  // Read params
  const name = getParam("name") || defaults.name;
  const month = getParam("month") || defaults.month;
  const year = getParam("year") || defaults.year;
  const city = getParam("city") || defaults.city;
  const venue = getParam("venue") || defaults.venue;
  const giftedBy = getParam("giftedBy") || defaults.giftedBy;

  // Apply
  $("nameText").textContent = safeUpper(name);
  $("cityText").textContent = safeUpper(city);
  $("venueText").textContent = safeUpper(venue);
  $("giftedByText").textContent = safeUpper(giftedBy);

  const dateText = `${safeUpper(month)} ${safeUpper(year)}`;
  $("dateText").textContent = dateText;

  const code = makeCode(city, year, name);
  $("codeText").textContent = code;

  // Self link
  const selfUrl = buildExampleUrl({
    name,
    month,
    year,
    city,
    venue,
    giftedBy
  });
  const selfLink = $("selfLink");
  selfLink.href = selfUrl;

  // Example url block (always show an example)
  $("exampleUrl").textContent = selfUrl;

  // Copy link button
  $("copyLinkBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(selfUrl);
      showToast("Link copied ✅");
    } catch (e) {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = selfUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast("Link copied ✅");
    }
  });

  // Download PNG
  $("downloadBtn").addEventListener("click", async () => {
    const ticket = $("ticket");
    if (!window.html2canvas) {
      showToast("PNG export unavailable (html2canvas not loaded).");
      return;
    }
    showToast("Rendering PNG…");

    const canvas = await window.html2canvas(ticket, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    });

    const a = document.createElement("a");
    const safeName = String(name).trim().replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
    a.download = `DreamTheater_Pass_${safeName || "VIP"}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();

    showToast("PNG downloaded ✅");
  });
})();
