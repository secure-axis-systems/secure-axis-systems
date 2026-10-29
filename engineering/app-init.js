if("serviceWorker"in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register(new URL("./sw.js",import.meta.url),{scope:"./"}).catch(()=>{}))}let installPrompt=null;window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();installPrompt=event;mountInstall()});window.addEventListener("appinstalled",()=>{document.getElementById("installApp")?.remove();installPrompt=null});function mountInstall(){const host=document.querySelector(".header-actions");if(!host||document.getElementById("installApp")||window.matchMedia("(display-mode: standalone)").matches||navigator.standalone)return;const button=document.createElement("button");button.id="installApp";button.type="button";button.className="secondary-action install-app-button";const arabic=document.querySelector(".app-shell")?.dir==="rtl";button.textContent=arabic?"تثبيت التطبيق":"Install app";button.onclick=async()=>{if(installPrompt){const promptEvent=installPrompt;installPrompt=null;await promptEvent.prompt();const result=await promptEvent.userChoice;if(result?.outcome==="accepted")button.remove();return}alert(arabic?"لتثبيت التطبيق على الكمبيوتر: افتح قائمة المتصفح ⋮ واختر Install SCA أو تثبيت هذا الموقع كتطبيق. إذا لم يظهر الخيار، استخدم إصدارًا حديثًا من Chrome أو Edge ثم حدّث الصفحة.":"To install on desktop, open the browser menu ⋮ and choose Install SCA or Install this site as an app. If the option is missing, use an updated Chrome or Edge and reload this page.")};host.prepend(button)}const installObserver=new MutationObserver(()=>mountInstall());installObserver.observe(document.documentElement,{childList:true,subtree:true});
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
   setTimeout(()=>location.href=href,520);
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
function scrollToIpPlanner(){
 if(location.hash!=="#ipCameraPlanner"||ipPlannerRouteScrolled)return false;
 const target=document.getElementById("ipCameraPlanner");
 if(!target)return false;
 ipPlannerRouteScrolled=true;target.style.scrollMarginTop="115px";
 requestAnimationFrame(()=>requestAnimationFrame(()=>target.scrollIntoView({block:"start",behavior:"smooth"})));
 return true;
}
window.addEventListener("hashchange",()=>{ipPlannerRouteScrolled=false;scrollToIpPlanner()});
const cameraModeObserver=new MutationObserver(()=>{mountCameraModeSwitch();mountHeroMark();scrollToIpPlanner()});
cameraModeObserver.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["lang"]});
mountCameraModeSwitch();mountHeroMark();mountInstall();scrollToIpPlanner();
