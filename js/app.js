// Lógica do site. Normalmente você NÃO precisa editar este arquivo.
(() => {
  const C = CONFIG;
  const $ = (s) => document.querySelector(s);
  const page = document.body.dataset.page;
  const brl = (v) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nomes = `${C.casal.noiva} & ${C.casal.noivo}`;

  // ---------- Menu e rodapé (iguais em todas as páginas) ----------
  function renderShell() {
    const links = [
      ["index.html", "Início", "inicio"],
      ["historia.html", "Nossa história", "historia"],
      ["fotos.html", "Fotos", "fotos"],
      ["presentes.html", "Presentes", "presentes"],
    ];
    $("#nav").innerHTML = `
      <a href="index.html" class="logo">${esc(C.casal.noiva[0])} <i>&</i> ${esc(C.casal.noivo[0])}</a>
      <button class="menu-btn" aria-label="Menu">☰</button>
      <ul class="menu">
        ${links.map(([h, t, p]) => `<li><a href="${h}" class="${p === page ? "active" : ""}">${t}</a></li>`).join("")}
        <li><a href="index.html#rsvp" class="btn-sm">Confirmar presença</a></li>
      </ul>`;
    $(".menu-btn").onclick = () => document.body.classList.toggle("menu-open");
    $("#footer").innerHTML = `<p class="script">${esc(nomes)}</p><p>${esc(C.casal.hashtag)}</p>`;
    if (page !== "inicio") document.title = `${document.title} · ${nomes}`;
    else document.title = `Casamento ${nomes}`;
  }

  // ---------- Página inicial ----------
  function renderHome() {
    $("#nomes").innerHTML = `${esc(C.casal.noiva)} <i>&</i> ${esc(C.casal.noivo)}`;
    $("#frase").textContent = C.casal.frase;
    $("#hero").style.backgroundImage = `url('${C.casal.fotoCapa}')`;
    $("#data-extenso").textContent = new Date(C.dataCasamento).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

    const tick = () => {
      const diff = new Date(C.dataCasamento) - new Date();
      if (diff <= 0) return ($("#countdown").innerHTML = "<p>É hoje! 💍</p>");
      let r = diff;
      $("#countdown").innerHTML = Object.entries({ dias: 864e5, horas: 36e5, min: 6e4, seg: 1e3 })
        .map(([k, ms]) => { const n = Math.floor(r / ms); r %= ms; return `<div><strong>${n}</strong><span>${k}</span></div>`; }).join("");
    };
    tick(); setInterval(tick, 1000);

    $("#eventos").innerHTML = C.eventos.map((e) => `
      <div class="card">
        <h3>${esc(e.titulo)}</h3><p class="hora">${esc(e.hora)}</p>
        <p><strong>${esc(e.local)}</strong><br/>${esc(e.endereco)}</p>
        <a class="btn-sm" href="${e.mapa}" target="_blank" rel="noopener">Ver no mapa</a>
      </div>`).join("");
    $("#info-grid").innerHTML = C.infos.map((i) =>
      `<div class="info"><div class="icon">${i.icone}</div><h3>${esc(i.titulo)}</h3><p>${esc(i.texto)}</p></div>`).join("");

    $("#rsvp-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector("button"); btn.disabled = true;
      const data = Object.fromEntries(new FormData(e.target));
      try {
        await send({ tipo: "RSVP", ...data });
        $("#rsvp-msg").textContent = data.presenca === "Sim" ? "Presença confirmada! Mal podemos esperar 💛" : "Obrigado por avisar! Sentiremos sua falta 💛";
        e.target.reset();
      } catch { $("#rsvp-msg").textContent = "Ops, tente novamente."; }
      btn.disabled = false;
    });
  }

  // ---------- Nossa história ----------
  function renderHistoria() {
    const H = C.historia;
    $("#page-hero").style.backgroundImage = `url('${H.fotoTopo}')`;
    $("#hist-intro").textContent = H.introducao;
    $("#hist-quote").textContent = H.citacao;
    $("#chapters").innerHTML = H.capitulos.map((c, i) => `
      <article class="chapter ${i % 2 ? "rev" : ""}">
        <div class="ch-photo">
          <span class="ch-num">${String(i + 1).padStart(2, "0")}</span>
          ${c.foto ? `<img src="${c.foto}" alt="${esc(c.titulo)}" loading="lazy" onerror="this.parentElement.classList.add('noimg');this.remove()">` : ""}
        </div>
        <div class="ch-text">
          <p class="ch-date">${esc(c.data)}</p>
          <h3>${esc(c.titulo)}</h3>
          <p>${esc(c.texto)}</p>
        </div>
      </article>`).join("");
    revealOnScroll(".chapter");
  }

  // ---------- Galeria (pré-wedding) ----------
  function renderFotos() {
    const G = C.galeria;
    $("#gal-title").textContent = G.titulo;
    $("#gal-sub").textContent = G.subtitulo;
    $("#gal-credit").textContent = G.fotografo || "";
    const fotos = Array.from({ length: G.quantidade }, (_, i) => ({
      src: `${G.pasta}${i + 1}.${G.extensao}`, cap: (G.legendas || {})[i + 1] || "",
    }));
    $("#gallery").innerHTML = fotos.map((f, i) => `
      <figure class="g-item" data-i="${i}">
        <img src="${f.src}" alt="${esc(f.cap) || "Foto do pré-wedding"}" loading="lazy" onerror="this.parentElement.remove()">
        ${f.cap ? `<figcaption>${esc(f.cap)}</figcaption>` : ""}
      </figure>`).join("");

    let idx = 0;
    const visible = () => [...document.querySelectorAll(".g-item")];
    const show = (i) => {
      const items = visible(); if (!items.length) return;
      idx = (i + items.length) % items.length;
      const f = fotos[+items[idx].dataset.i];
      $("#lb-img").src = f.src; $("#lb-cap").textContent = f.cap;
      $("#lightbox").classList.add("open");
    };
    const close = () => $("#lightbox").classList.remove("open");
    $("#gallery").addEventListener("click", (e) => {
      const it = e.target.closest(".g-item"); if (it) show(visible().indexOf(it));
    });
    $(".lb-close").onclick = close;
    $(".lb-prev").onclick = () => show(idx - 1);
    $(".lb-next").onclick = () => show(idx + 1);
    $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") close(); });
    document.addEventListener("keydown", (e) => {
      if (!$("#lightbox").classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    let x0 = null; // swipe no celular
    $("#lightbox").addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX));
    $("#lightbox").addEventListener("touchend", (e) => {
      if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); x0 = null;
    });
  }

  // ---------- Lista de presentes ----------
  function renderPresentes() {
    const P = C.presentes;
    $("#gift-intro").textContent = P.mensagem;
    const icon = Object.fromEntries(P.categorias.map((c) => [c.nome, c.icone]));
    let cat = "Todos", sort = "padrao", current = null, qty = 1;

    const media = (g) => `
      <div class="g-media ${g.foto ? "" : "noimg"}" data-emoji="${g.emoji || "🎁"}">
        ${g.foto ? `<img src="${g.foto}" alt="${esc(g.nome)}" loading="lazy" onerror="this.parentElement.classList.add('noimg');this.remove()">` : ""}
      </div>`;

    function draw() {
      $("#filters").innerHTML = ["Todos", ...P.categorias.map((c) => c.nome)].map((c) =>
        `<button class="${c === cat ? "active" : ""}" data-c="${esc(c)}">${icon[c] ? icon[c] + " " : ""}${esc(c)}</button>`).join("");

      let list = P.itens.map((g, i) => ({ ...g, i })).filter((g) => cat === "Todos" || g.categoria === cat);
      if (sort === "menor") list.sort((a, b) => a.valor - b.valor);
      if (sort === "maior") list.sort((a, b) => b.valor - a.valor);

      const cards = list.map((g) => {
        const temMeta = g.cota && g.cotasTotal;
        const pct = temMeta ? Math.min(100, Math.round((100 * (g.cotasRecebidas || 0)) / g.cotasTotal)) : 0;
        const esgotado = temMeta && pct >= 100;
        return `
        <article class="gift ${esgotado ? "soldout" : ""}">
          ${g.destaque && !esgotado ? `<span class="badge">${esc(g.destaque)}</span>` : ""}
          ${esgotado ? `<span class="badge done">Esgotado 💛</span>` : ""}
          ${media(g)}
          <div class="g-body">
            <p class="g-cat">${icon[g.categoria] || ""} ${esc(g.categoria)}</p>
            <h3>${esc(g.nome)}</h3>
            ${g.descricao ? `<p class="g-desc">${esc(g.descricao)}</p>` : ""}
            ${temMeta ? `<div class="progress"><div style="width:${pct}%"></div></div>
              <p class="g-meta">${g.cotasRecebidas || 0} de ${g.cotasTotal} cotas</p>` : ""}
            <div class="g-foot">
              <p class="price">${brl(g.valor)}${g.cota ? "<small> /cota</small>" : ""}</p>
              <button class="btn-sm" data-i="${g.i}" ${esgotado ? "disabled" : ""}>${esgotado ? "Completo" : "Presentear"}</button>
            </div>
          </div>
        </article>`;
      });
      if (P.valorLivre?.ativo && cat === "Todos") {
        const v = P.valorLivre;
        cards.push(`
        <article class="gift free-card">
          <div class="g-media noimg" data-emoji="${v.emoji}"></div>
          <div class="g-body">
            <p class="g-cat">Do seu jeito</p>
            <h3>${esc(v.titulo)}</h3><p class="g-desc">${esc(v.descricao)}</p>
            <div class="g-foot"><p class="price">Você escolhe</p><button class="btn-sm" data-i="livre">Presentear</button></div>
          </div>
        </article>`);
      }
      $("#gifts").innerHTML = cards.join("");
    }

    function total() { return current.livre ? Math.max(1, Number($("#m-free-input").value) || 0) : current.valor * qty; }

    function updatePix() {
      const v = total();
      $("#m-qty-n").textContent = qty;
      $("#m-value").textContent = brl(v);
      const code = Pix.payload({ ...C.pix, valor: v, descricao: current.nome });
      $("#m-code").value = code;
      if (typeof qrcode === "function") { // se a biblioteca do QR não carregar, o Copia e Cola continua funcionando
        const qr = qrcode(0, "M"); qr.addData(code); qr.make();
        $("#qrcode").innerHTML = qr.createSvgTag({ cellSize: 5, margin: 2, scalable: true });
      }
    }

    function open(i) {
      current = i === "livre" ? { nome: P.valorLivre.titulo, descricao: P.valorLivre.descricao, emoji: P.valorLivre.emoji, livre: true }
                              : P.itens[+i];
      qty = 1;
      $("#m-media").innerHTML = media(current);
      $("#m-title").textContent = current.nome;
      $("#m-desc").textContent = current.descricao || "";
      $("#m-qty").style.display = current.cota ? "flex" : "none";
      $("#m-free").style.display = current.livre ? "flex" : "none";
      $("#gift-msg").textContent = ""; $("#gift-form").reset();
      updatePix();
      $("#modal").classList.add("open");
      document.body.style.overflow = "hidden";
    }
    const close = () => { $("#modal").classList.remove("open"); document.body.style.overflow = ""; };

    $("#filters").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { cat = b.dataset.c; draw(); } });
    $("#sort").addEventListener("change", (e) => { sort = e.target.value; draw(); });
    $("#gifts").addEventListener("click", (e) => { const b = e.target.closest("button[data-i]"); if (b && !b.disabled) open(b.dataset.i); });
    $("#m-qty").addEventListener("click", (e) => {
      const d = e.target.dataset.d; if (!d) return;
      const max = current.cotasTotal ? Math.max(1, current.cotasTotal - (current.cotasRecebidas || 0)) : 99;
      qty = Math.min(max, Math.max(1, qty + Number(d))); updatePix();
    });
    $("#m-free-input").addEventListener("input", updatePix);
    $("#m-close").onclick = close;
    $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") close(); });
    $("#m-copy").onclick = (e) => {
      navigator.clipboard.writeText($("#m-code").value);
      e.target.textContent = "Copiado!"; setTimeout(() => (e.target.textContent = "Copiar"), 1500);
    };
    $("#gift-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      await send({ tipo: "PRESENTE", presente: current.nome, cotas: current.cota ? qty : 1, valor: total(), ...data });
      $("#gift-msg").textContent = "Muito obrigado pelo carinho! 🥰";
      setTimeout(close, 1800);
    });
    draw();
  }

  // ---------- Utilidades ----------
  async function send(data) {
    if (!C.googleScriptUrl) { console.log("Modo teste (sem planilha):", data); return; }
    await fetch(C.googleScriptUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) });
  }

  function revealOnScroll(sel) {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    document.querySelectorAll(sel).forEach((el) => io.observe(el));
  }

  renderShell();
  ({ inicio: renderHome, historia: renderHistoria, fotos: renderFotos, presentes: renderPresentes }[page] || (() => {}))();
})();
