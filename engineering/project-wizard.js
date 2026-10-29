(() => {
  const analog = Boolean(document.getElementById("count") && document.getElementById("mp"));
  const storageKey = "sca-guided-project-v1";
  const css = document.createElement("style");
  css.textContent = ".sca-wizard-launch{display:block;position:relative;z-index:1;width:max-content;max-width:100%;margin:14px 0 22px;padding:12px 17px;border:1px solid #6aaeb1;border-radius:12px;background:linear-gradient(135deg,#B0D7D8,#79b8bb);color:#102a32;font:inherit;font-weight:700;font-size:15px;line-height:1.3;cursor:pointer;box-shadow:0 8px 22px #163c421f}.sca-wizard-launch:hover{filter:brightness(1.04);transform:translateY(-1px)}.camera-mode-switch a,.switch a{border-color:#9bbfc1!important;background:color-mix(in srgb,#B0D7D8 18%,transparent)!important;color:inherit!important;transition:background .2s,color .2s,border-color .2s}.camera-mode-switch a.sca-mode-active,.camera-mode-switch a[aria-current="page"],.switch a.sca-mode-active,.switch a.selected{border-color:#80b6b9!important;background:#B0D7D8!important;color:#102a32!important}.sca-wizard-overlay{position:fixed;inset:0;z-index:9999;display:none;place-items:center;padding:16px;background:#07111bc7;backdrop-filter:blur(9px)}.sca-wizard-overlay.open{display:grid}.sca-wizard{width:min(560px,100%);max-height:min(90dvh,760px);overflow:auto;padding:clamp(18px,4vw,28px);border:1px solid #8dbfc0;border-radius:20px;background:var(--surface,#fff);color:var(--ink,#172a3d);box-shadow:0 24px 80px #0006;animation:scaWizardIn .22s ease-out}.sca-wizard h2{margin:5px 0 4px;font-size:1.35rem}.sca-wizard p{color:var(--muted,#62758a);margin:0 0 16px}.sca-wizard .progress{height:5px;background:#91b9bc55;border-radius:8px;margin:14px 0 20px;overflow:hidden}.sca-wizard .progress i{display:block;height:100%;background:#4e999d;transition:width .2s}.sca-wizard .fields{display:grid;gap:13px}.sca-wizard label{display:grid;gap:6px;font-size:.88rem;font-weight:650}.sca-wizard input,.sca-wizard select{min-height:46px;padding:10px 12px;border:1px solid var(--line,#d9e3ea);border-radius:10px;background:var(--bg,#f4f7f9);color:var(--ink,#172a3d);font:inherit}.sca-wizard .actions{display:flex;justify-content:space-between;gap:10px;margin-top:20px}.sca-wizard button{min-height:44px;padding:9px 14px;border:1px solid var(--line,#d9e3ea);border-radius:10px;background:var(--surface,#fff);color:var(--ink,#172a3d);font:inherit;font-weight:700;cursor:pointer}.sca-wizard button.primary{background:#B0D7D8;color:#102a32;border-color:#8dbfc0}.sca-wizard .close{float:inline-end;border:0;background:transparent;font-size:1.4rem;min-height:34px;padding:0 8px}.sca-wizard .success{padding:12px;border-radius:10px;background:#4e999d20;color:var(--ink,#172a3d)}.sca-wizard [hidden]{display:none!important}@keyframes scaWizardIn{from{opacity:0;transform:translateY(10px) scale(.99)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){.sca-wizard,.sca-wizard-launch{animation:none;transition:none}}";
  document.head.append(css);

  const copy = {
    en: { launch:"Start project setup", step1:"Project details", step2:"Camera requirements", intro1:"Add the project information. It will be included in the project sheet where supported.", intro2:"Enter the basic camera requirements. SCA will fill the matching calculators; you can still adjust every field afterward.", project:"Project / site name", engineer:"Engineer / technician", count:"Number of cameras", days:"Recording retention (days)", bitrate:"Average bitrate per camera (Mbps)", mp:"Camera resolution (MP)", next:"Continue", back:"Back", apply:"Apply to calculators", close:"Close", saved:"Project details applied. Review the calculations below; you can edit any value before exporting the report.", required:"Enter a project name and a valid camera count.", systemIP:"IP camera project", systemAnalog:"Analog camera project", camera:"Camera count", name:"Project / site", who:"Engineer / technician" },
    ar: { launch:"إعداد المشروع خطوة بخطوة", step1:"بيانات المشروع", step2:"متطلبات الكاميرات", intro1:"أدخل بيانات المشروع لتظهر في ورقة المشروع حيثما كانت الخانة متاحة.", intro2:"أدخل المتطلبات الأساسية. سيملأ SCA الحاسبات المرتبطة، ويمكنك تعديل أي قيمة بعد ذلك.", project:"اسم المشروع / الموقع", engineer:"اسم المهندس / الفني", count:"عدد الكاميرات", days:"مدة التسجيل (يوم)", bitrate:"معدل البت لكل كاميرا (Mbps)", mp:"دقة الكاميرا (MP)", next:"التالي", back:"رجوع", apply:"تطبيق على الحاسبات", close:"إغلاق", saved:"تم تطبيق بيانات المشروع. راجع الحسابات بالأسفل وعدّل أي قيمة قبل تصدير التقرير.", required:"أدخل اسم المشروع وعدد كاميرات صحيحًا.", systemIP:"مشروع كاميرات IP", systemAnalog:"مشروع كاميرات Analog", camera:"عدد الكاميرات", name:"المشروع / الموقع", who:"المهندس / الفني" }
  };
  const lang = () => document.documentElement.lang === "ar" ? "ar" : "en";
  const text = (k) => copy[lang()][k];
  const launch = document.createElement("button");
  launch.type = "button";
  launch.className = "sca-wizard-launch";
  launch.textContent = text("launch");
  const anchor = document.querySelector(".page-content") || document.querySelector(".shell") || document.querySelector("main") || document.body;
  const switchNav = document.querySelector(analog ? ".switch" : "#cameraModeSwitch");
  if (switchNav) {
    switchNav.insertAdjacentElement("afterend", launch);
    switchNav.querySelectorAll("a[data-mode]").forEach((link) => {
      const selected = link.dataset.mode === (analog ? "analog" : "ip");
      link.classList.toggle("sca-mode-active", selected);
      if (selected) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
  } else {
    const hero = document.querySelector(".hero-panel,.hero");
    if (hero) hero.insertAdjacentElement("beforebegin", launch); else anchor.append(launch);
  }

  const overlay = document.createElement("div");
  overlay.className = "sca-wizard-overlay";
  overlay.innerHTML = '<section class="sca-wizard" role="dialog" aria-modal="true" aria-labelledby="scaWizardTitle"><button type="button" class="close" aria-label="Close">×</button><div class="step-label"></div><h2 id="scaWizardTitle"></h2><p class="description"></p><div class="progress"><i></i></div><form><div class="fields project-fields"><label class="project-label"></label><label class="engineer-label"></label></div><div class="fields camera-fields" hidden><label class="count-label"></label><label class="days-label"></label><label class="bitrate-label"></label><label class="mp-label"></label></div><div class="actions"><button type="button" class="back"></button><button type="button" class="primary next"></button></div><div class="success" hidden></div></form></section>';
  document.body.append(overlay);
  const q = (sel) => overlay.querySelector(sel);
  const field = (label, type, value, min, step) => {
    const input = document.createElement(type === "select" ? "select" : "input");
    if (type !== "select") { input.type = type; input.value = value || ""; if (min !== undefined) input.min = String(min); if (step) input.step = step; }
    label.append(document.createElement("span"), input);
    return input;
  };
  const projectInput = field(q(".project-label"), "text", "");
  const engineerInput = field(q(".engineer-label"), "text", "");
  const countInput = field(q(".count-label"), "number", "10", 1, "1");
  const daysInput = field(q(".days-label"), "number", "30", 1, "1");
  const bitrateInput = field(q(".bitrate-label"), "number", "4", 0.1, "0.1");
  const mpInput = field(q(".mp-label"), "select");
  ["1","2","3","4","5","8"].forEach((v) => { const opt = document.createElement("option"); opt.value = v; opt.textContent = v + " MP"; mpInput.append(opt); });
  const setInput = (labelSelector, value) => {
    if (!value) return;
    const labels = [...document.querySelectorAll("label")];
    const label = labels.find((el) => labelSelector.test(el.textContent || ""));
    const input = label?.querySelector("input,select,textarea");
    if (!input) return;
    const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), "value")?.set;
    if (setter) setter.call(input, String(value)); else input.value = String(value);
    input.dispatchEvent(new Event("input", { bubbles:true }));
    input.dispatchEvent(new Event("change", { bubbles:true }));
  };
  const setSection = (selector, indexes, values) => {
    const section = document.querySelector(selector);
    if (!section) return;
    const inputs = [...section.querySelectorAll('input[type="number"]')];
    indexes.forEach((index, position) => {
      if (inputs[index] && values[position] !== undefined && values[position] !== "") {
        const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(inputs[index]), "value")?.set;
        if (setter) setter.call(inputs[index], String(values[position])); else inputs[index].value = String(values[position]);
        inputs[index].dispatchEvent(new Event("input", { bubbles:true }));
        inputs[index].dispatchEvent(new Event("change", { bubbles:true }));
      }
    });
  };
  let step = 1;
  let complete = false;
  const syncAnalogReport = () => {
    if (!analog) return;
    let data;
    try { data = JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch (_) { return; }
    const list = document.getElementById("reportList");
    if (!list || data.system !== "analog" || !data.project) return;
    const rows = [[text("name"), data.project],[text("who"), data.engineer || "—"]];
    rows.forEach(([label, value], i) => {
      let row = list.querySelector('[data-wizard-row="' + i + '"]');
      if (!row) { row = document.createElement("div"); row.className = "report-row"; row.dataset.wizardRow = String(i); row.innerHTML = "<dt></dt><dd></dd>"; list.append(row); }
      if (row.children[0].textContent !== label) row.children[0].textContent = label;
      if (row.children[1].textContent !== value) row.children[1].textContent = value;
    });
    const previewList = document.querySelector("#previewContent .report-list");
    if (previewList) rows.forEach(([label, value], i) => {
      let row = previewList.querySelector('[data-wizard-row="' + i + '"]');
      if (!row) { row = document.createElement("div"); row.className = "report-row"; row.dataset.wizardRow = String(i); row.innerHTML = "<dt></dt><dd></dd>"; previewList.append(row); }
      row.children[0].textContent = label; row.children[1].textContent = value;
    });
  };
  const render = () => {
    const c = copy[lang()];
    launch.textContent = c.launch;
    q(".step-label").textContent = (step === 1 ? "1 / 2 · " + c.step1 : "2 / 2 · " + c.step2);
    q("#scaWizardTitle").textContent = step === 1 ? c.step1 : c.step2;
    q(".description").textContent = step === 1 ? c.intro1 : c.intro2;
    q(".project-fields").hidden = step !== 1;
    q(".camera-fields").hidden = step !== 2;
    q(".progress i").style.width = step === 1 ? "50%" : "100%";
    q(".back").textContent = c.back;
    q(".back").style.visibility = step === 1 ? "hidden" : "visible";
    q(".next").textContent = step === 1 ? c.next : c.apply;
    q(".close").setAttribute("aria-label", c.close);
    q(".project-label span").textContent = c.project;
    q(".engineer-label span").textContent = c.engineer;
    q(".count-label span").textContent = c.count;
    q(".days-label span").textContent = c.days;
    q(".bitrate-label span").textContent = c.bitrate;
    q(".mp-label span").textContent = c.mp;
    projectInput.placeholder = c.project;
    engineerInput.placeholder = c.engineer;
    countInput.max = analog ? "4096" : "4096";
    q(".success").hidden = true;
  };
  const open = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      projectInput.value = saved.project || "";
      engineerInput.value = saved.engineer || "";
      countInput.value = saved.count || "10";
      daysInput.value = saved.days || "30";
      bitrateInput.value = saved.bitrate || "4";
      mpInput.value = saved.mp || "2";
    } catch (_) {}
    step = 1; complete = false; render(); overlay.classList.add("open"); projectInput.focus();
  };
  const close = () => overlay.classList.remove("open");
  launch.addEventListener("click", open);
  q(".close").addEventListener("click", close);
  q(".back").addEventListener("click", () => { step = 1; render(); });
  q(".next").addEventListener("click", () => {
    if (complete) { close(); return; }
    if (step === 1) {
      if (!projectInput.value.trim()) { projectInput.focus(); projectInput.reportValidity?.(); return; }
      step = 2; render(); countInput.focus(); return;
    }
    const count = Number(countInput.value), days = Number(daysInput.value);
    if (!Number.isInteger(count) || count < 1 || count > 4096 || !Number.isInteger(days) || days < 1 || days > 730) { countInput.focus(); return; }
    const data = { project:projectInput.value.trim(), engineer:engineerInput.value.trim(), count:String(count), days:String(days), bitrate:String(bitrateInput.value), mp:mpInput.value, system:analog ? "analog" : "ip" };
    try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch (_) {}
    if (analog) {
      const set = (id, value) => { const el = document.getElementById(id); if (!el) return; el.value = value; el.dispatchEvent(new Event("input",{bubbles:true})); el.dispatchEvent(new Event("change",{bubbles:true})); };
      set("count", count); set("days", days); set("mp", data.mp);
      syncAnalogReport();
    } else {
      setSection("#storage", [0,1,2], [count, data.bitrate, days]);
      setSection("#bandwidth", [0,1], [count, data.bitrate]);
      setSection("#poe", [0], [count]);
      setInput(/project\s*\/?\s*site\s*name|اسم المشروع|اسم الموقع/i, data.project);
      setInput(/technician\s*\/\s*engineer|engineer|المهندس|الفني/i, data.engineer);
    }
    q(".success").textContent = text("saved");
    q(".success").hidden = false;
    q(".next").textContent = text("close");
    complete = true;
    document.querySelector(analog ? ".report" : "#reports")?.scrollIntoView({behavior:"smooth",block:"start"});
  });
  overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && overlay.classList.contains("open")) close(); });
  ["count","days","mp"].forEach((id) => document.getElementById(id)?.addEventListener("input", () => setTimeout(syncAnalogReport, 0)));
  const languageObserver = new MutationObserver(() => { render(); syncAnalogReport(); });
  languageObserver.observe(document.documentElement, {attributes:true,attributeFilter:["lang"]});
  render();
})();