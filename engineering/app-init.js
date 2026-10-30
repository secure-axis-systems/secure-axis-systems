const initialHomeEntry=location.hash===""||location.hash==="#calculators";
if(location.hash==="#calculators")history.replaceState(history.state,"",location.pathname+location.search);
if(initialHomeEntry){
 try{history.scrollRestoration="manual"}catch(_){}
 const returnToTop=()=>requestAnimationFrame(()=>window.scrollTo(0,0));
 if(document.readyState==="complete")returnToTop();else window.addEventListener("load",returnToTop,{once:true});
 window.addEventListener("load",()=>setTimeout(()=>{try{history.scrollRestoration="auto"}catch(_){}},1200),{once:true});
}
if("serviceWorker"in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register(new URL("./sw.js",import.meta.url),{scope:"./"}).catch(()=>{}))}let installPrompt=null;window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();installPrompt=event;mountInstall()});window.addEventListener("appinstalled",()=>{document.getElementById("installApp")?.remove();installPrompt=null});function mountInstall(){const host=document.querySelector(".header-actions");if(!host||document.getElementById("installApp")||window.matchMedia("(display-mode: standalone)").matches||navigator.standalone)return;const button=document.createElement("button");button.id="installApp";button.type="button";button.className="secondary-action install-app-button";const arabic=document.querySelector(".app-shell")?.dir==="rtl";button.textContent=arabic?"تثبيت التطبيق":"Install app";button.onclick=async()=>{if(installPrompt){const promptEvent=installPrompt;installPrompt=null;await promptEvent.prompt();const result=await promptEvent.userChoice;if(result?.outcome==="accepted")button.remove();return}(()=>{const ua=navigator.userAgent||"";const ios=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);const android=/Android/i.test(ua);const msg=ios?(arabic?"لتثبيت SCA على iPhone أو iPad: افتح الرابط في Safari، اضغط مشاركة، ثم اختر إضافة إلى الشاشة الرئيسية. لو الصفحة مفتوحة داخل Messenger، اختر فتح في Safari أولاً.":"To add SCA on iPhone or iPad: open this link in Safari, tap Share, then Add to Home Screen. If it is open inside Messenger, choose Open in Safari first."):android?(arabic?"لتثبيت SCA على Android: افتح الرابط في Chrome، اضغط القائمة ⋮ ثم اختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية. إذا كنت داخل Messenger، افتح الرابط في Chrome أولاً.":"To install SCA on Android: open this link in Chrome, tap ⋮, then choose Install app or Add to Home screen. If it is open inside Messenger, open it in Chrome first."): (arabic?"لتثبيت التطبيق: افتح قائمة المتصفح واختر تثبيت التطبيق أو Install this site as an app.":"To install the app, open the browser menu and choose Install app or Install this site as an app.");alert(msg)})()};host.prepend(button)}const installObserver=new MutationObserver(()=>mountInstall());installObserver.observe(document.documentElement,{childList:true,subtree:true});
function mountLanguageToggle(){const host=document.querySelector(".header-actions");const source=host?.querySelector(".lang-switch");if(!host||!source)return false;source.classList.add("language-source-hidden");let button=document.getElementById("scaLanguageToggle");if(!button){button=document.createElement("button");button.id="scaLanguageToggle";button.type="button";button.className="language-toggle";button.addEventListener("click",()=>{const group=document.querySelector(".header-actions .lang-switch");if(!group)return;const buttons=[...group.querySelectorAll("button")];const active=group.querySelector('button[aria-pressed="true"]')||group.querySelector("button.active");const next=buttons.find(item=>item!==active);next?.click();setTimeout(syncLabel,0)});host.insertBefore(button,source)}function syncLabel(){const arabic=document.documentElement.lang==="ar";const label=arabic?"English":"العربية";const aria=arabic?"Switch language to English":"تغيير اللغة إلى العربية";if(button.textContent!==label)button.textContent=label;if(button.getAttribute("aria-label")!==aria)button.setAttribute("aria-label",aria);if(button.title!==aria)button.title=aria}syncLabel();return true}
const languageToggleObserver=new MutationObserver(()=>mountLanguageToggle());languageToggleObserver.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["lang"]});
function mountCameraModeSwitch(){
 const page=document.querySelector(".page-content");
 const shell=document.querySelector(".app-shell");
 if(!page||!shell)return false;
 let mode=document.getElementById("cameraModeSwitch");
 if(!mode){
  mode=document.createElement("nav");
  mode.id="cameraModeSwitch";
  mode.className="camera-mode-switch";
  mode.setAttribute("aria-label","Camera system type");
  const ip=document.createElement("a");
  ip.href="./index.html#ipCameraPlanner";
  ip.dataset.mode="ip";
  ip.innerHTML='<svg class="mode-camera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3"/><path d="M7 7l1.5-3h7L17 7M7 21h10"/></svg><span></span>';ip.querySelector("span").textContent=document.documentElement.lang==="ar"?"كاميرات IP":"IP camera planner";
  const analog=document.createElement("a");
  analog.href="./analog.html";
  analog.dataset.mode="analog";
  analog.className="analog-nav-link";
  analog.innerHTML='<svg class="mode-camera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3"/><path d="M7 7l1.5-3h7L17 7M7 21h10"/></svg><span></span>';analog.querySelector("span").textContent=document.documentElement.lang==="ar"?"كاميرات Analog":"Analog camera planner";
  const access=document.createElement("a");access.href="./access-control.html";access.dataset.mode="access";access.className="access-nav-link";access.innerHTML="<span></span>";access.querySelector("span").textContent=document.documentElement.lang==="ar"?"التحكم في الدخول":"Access control";
  mode.append(ip,analog,access);
  page.prepend(mode);
  mode.querySelectorAll("a").forEach(link=>link.addEventListener("click",event=>{
   if(event.ctrlKey||event.metaKey||event.shiftKey)return;
   event.preventDefault();
   const href=link.getAttribute("href");
   const arabic=document.documentElement.lang==="ar";
   let overlay=document.getElementById("cameraModeTransition");
   if(!overlay){overlay=document.createElement("div");overlay.id="cameraModeTransition";overlay.className="camera-mode-transition";overlay.innerHTML='<div class="camera-mode-transition-card"><svg class="camera-transition-icon" viewBox="0 0 24 24" fill="none" stroke="#B0D7D8" stroke-width="1.6"><rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3"/><path d="M7 7l1.5-3h7L17 7M7 21h10"/></svg><p></p><strong></strong><i></i></div>';document.body.append(overlay)}
   overlay.querySelector("p").textContent=arabic?"جارٍ فتح مساحة الكاميرات":"Opening camera workspace";
   overlay.querySelector("strong").textContent=link.dataset.mode==="analog"?(arabic?"كاميرات Analog":"Analog Camera Planner"):(link.dataset.mode==="access"?(arabic?"التحكم في الدخول":"Access Control"):(arabic?"كاميرات IP":"IP Camera Planner"));
   overlay.classList.add("show");document.body.classList.add("page-leave");
   const destination=new URL(href,location.href),sameDocument=destination.origin===location.origin&&destination.pathname===location.pathname&&destination.search===location.search;
   setTimeout(()=>{
    if(!sameDocument){location.href=href;return}
    if(destination.hash!==location.hash)location.hash=destination.hash;
    else document.getElementById("ipCameraPlanner")?.scrollIntoView({block:"start",behavior:"smooth"});
    setTimeout(()=>{overlay.classList.remove("show");document.body.classList.remove("page-leave");setTimeout(()=>overlay.remove(),220)},220);
   },520);
  }));
 }else{
  const links=mode.querySelectorAll("a");
  if(links[0]){const label=document.documentElement.lang==="ar"?"كاميرات IP":"IP camera planner";const span=links[0].querySelector("span");if(span&&span.textContent!==label)span.textContent=label;}
  if(links[1]){const label=document.documentElement.lang==="ar"?"كاميرات Analog":"Analog camera planner";const span=links[1].querySelector("span");if(span&&span.textContent!==label)span.textContent=label;}
  if(links[2]){const label=document.documentElement.lang==="ar"?"Access Control":"Access control";const span=links[2].querySelector("span");if(span&&span.textContent!==label)span.textContent=label;}
 }
 return true;
}
function mountHeroMark(){const hero=document.querySelector(".hero-panel");if(!hero||hero.querySelector(".sca-hero-mark"))return;const mark=document.createElement("div");mark.className="sca-hero-mark";mark.setAttribute("aria-hidden","true");const letters=document.createElement("div");letters.className="sca-hero-letters";["S","C","A"].forEach((letter,index)=>{const span=document.createElement("span");span.textContent=letter;span.style.setProperty("--letter-index",index);letters.append(span)});const subtitle=document.createElement("div");subtitle.className="sca-hero-subtitle";subtitle.textContent="Security Calculator app";mark.append(letters,subtitle);hero.append(mark)}
let ipPlannerRouteScrolled=false;
function syncIpPlannerRoute(){
 const active=location.hash==="#ipCameraPlanner";
 document.body.classList.toggle("ip-camera-route",active);
 let heading=document.getElementById("ipPlannerRouteHeading");
 if(!active){ipPlannerRouteScrolled=false;heading?.remove();return false}
 const target=document.getElementById("ipCameraPlanner");
 if(!target)return false;
 target.style.scrollMarginTop="115px";
 if(!heading){
  heading=document.createElement("header");heading.id="ipPlannerRouteHeading";heading.className="ip-planner-route-heading";
  heading.innerHTML='<div class="ip-planner-brand-animation page-brand-animation" aria-label="SCA Security Calculator app"><div class="ip-planner-letters page-brand-letters" aria-hidden="true"><span style="--letter-index:0">S</span><span style="--letter-index:1">C</span><span style="--letter-index:2">A</span></div><strong class="ip-planner-app-title page-brand-subtitle"></strong></div><p></p><h1></h1><div class="ip-planner-description"></div>';const nav=document.getElementById("cameraModeSwitch");if(nav)nav.after(heading);else target.before(heading);
 }
 const ar=document.documentElement.lang==="ar";
 const text=(selector,value)=>{const node=heading.querySelector(selector);if(node&&node.textContent!==value)node.textContent=value};
 text(".ip-planner-app-title","Security Calculator app");
 text("p",ar?"SCA · تخطيط أنظمة الكاميرات":"SCA · CAMERA SYSTEM PLANNING");
 text("h1",ar?"مخطط كاميرات IP":"IP Camera Planner");
 text(".ip-planner-description",ar?"جهّز عناوين الشبكة وجدول الكاميرات وراجع حسابات المشروع في مساحة واحدة.":"Plan network addressing, camera schedules, and project calculations in one focused workspace.");
 if(!ipPlannerRouteScrolled){
  ipPlannerRouteScrolled=true;
  requestAnimationFrame(()=>requestAnimationFrame(()=>heading.scrollIntoView({block:"start",behavior:"smooth"})));
 }
 return true;
}
window.addEventListener("hashchange",()=>{ipPlannerRouteScrolled=false;syncIpPlannerRoute()});
const cameraModeObserver=new MutationObserver(()=>{mountCameraModeSwitch();mountHeroMark();syncIpPlannerRoute();syncCameraNameStatus()});
cameraModeObserver.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["lang"]});

function setCameraNameStatus(en,ar){const status=document.querySelector(".camera-name-status");if(!status)return;status.dataset.enText=en;status.dataset.arText=ar;status.textContent=document.documentElement.lang==="ar"?ar:en}
function syncCameraNameStatus(){const status=document.querySelector(".camera-name-status");if(status?.dataset.enText)status.textContent=document.documentElement.lang==="ar"?status.dataset.arText:status.dataset.enText}
window.scaSuggestCameraNames=function(){
 const first=document.querySelector('#reports .camera-table tbody input[data-sca-camera-index="0"]');
 if(!first){setCameraNameStatus("Generate the camera list first.","أنشئ جدول الكاميرات أولاً.");return}
 const sample=first.value.trim();
 if(!sample){setCameraNameStatus("Enter the first camera name in the table first.","اكتب اسم أول كاميرا في الجدول أولاً.");first.focus();return}
 window.scaCompleteCameraNames?.(sample);
 setCameraNameStatus("Other camera names are suggested from the first name and stay editable.","يتم اقتراح بقية الأسماء من الاسم الأول وتظل قابلة للتعديل.");
};
document.addEventListener("input",event=>{if(event.target?.matches?.('#reports .camera-table input[data-sca-camera-index="0"]'))setCameraNameStatus("Other camera names are suggested as you type and stay editable.","يتم اقتراح بقية الأسماء أثناء الكتابة وتظل قابلة للتعديل.");});
window.scaPrintCameraSchedule=function(ar){
 const source=document.querySelector("#reports .camera-table");
 if(!source)return;
 window.scaSaveReportDraft?.();
 let cameras=[];
 try{const draft=JSON.parse(sessionStorage.getItem("sca-report-draft-v1")||"null");if(Array.isArray(draft?.cameras))cameras=draft.cameras}catch(_){}
 if(!cameras.length)cameras=[...source.querySelectorAll("tbody tr")].map(row=>{const cells=row.querySelectorAll("td input");return{name:cells[0]?.value||"",ipAddress:cells[1]?.value||""}});
 if(!cameras.length)return;
 document.getElementById("scaCameraSchedulePrint")?.remove();
 const print=document.createElement("main");print.id="scaCameraSchedulePrint";print.dir=ar?"rtl":"ltr";
 const project=document.getElementById("scaScheduleProjectName")?.value.trim()||"";
 const headers=[...source.querySelectorAll("thead th")].map(th=>th.textContent.trim());
 for(let offset=0;offset<cameras.length;offset+=30){
  const page=document.createElement("section");page.className="print-camera-page";page.dir=ar?"rtl":"ltr";
  const brand=document.createElement("div");brand.className="print-brand";brand.textContent="SCA";brand.style.color=document.documentElement.dataset.theme==="dark"?"#B0D7D8":"#427F82";page.append(brand);
  const title=document.createElement("h1");title.textContent=offset===0?(ar?"جدول كاميرات المشروع":"Project camera schedule"):(ar?"جدول كاميرات المشروع — تابع":"Project camera schedule — continued");page.append(title);
  if(project){const name=document.createElement("p");name.className="print-project-name";name.textContent=(ar?"المشروع: ":"Project: ")+project;page.append(name)}
  const range=document.createElement("p");range.className="print-camera-count";range.textContent=ar?("الكاميرات "+(offset+1)+"–"+Math.min(offset+30,cameras.length)+" من "+cameras.length):("Cameras "+(offset+1)+"–"+Math.min(offset+30,cameras.length)+" of "+cameras.length);page.append(range);
  const table=document.createElement("table");table.className="camera-table print-camera-table";
  const thead=document.createElement("thead"),headRow=document.createElement("tr");
  headers.forEach(label=>{const th=document.createElement("th");th.textContent=label;headRow.append(th)});thead.append(headRow);table.append(thead);
  const tbody=document.createElement("tbody");
  cameras.slice(offset,offset+30).forEach(camera=>{const tr=document.createElement("tr");[camera.name,camera.ipAddress].forEach(value=>{const td=document.createElement("td");td.textContent=value||"";tr.append(td)});tbody.append(tr)});
  table.append(tbody);page.append(table);print.append(page)
 }
 document.body.append(print);document.body.classList.add("sca-print-schedule-only");
 const cleanup=()=>{document.body.classList.remove("sca-print-schedule-only");print.remove();window.removeEventListener("afterprint",cleanup)};
 window.addEventListener("afterprint",cleanup,{once:true});window.print()
};
mountCameraModeSwitch();mountHeroMark();mountInstall();mountLanguageToggle();syncIpPlannerRoute();
