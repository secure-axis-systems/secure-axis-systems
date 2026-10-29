if("serviceWorker"in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register(new URL("./sw.js",import.meta.url),{scope:"./"}).catch(()=>{}))}let installPrompt=null;window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();installPrompt=event;mountInstall()});window.addEventListener("appinstalled",()=>{document.getElementById("installApp")?.remove();installPrompt=null});function mountInstall(){const host=document.querySelector(".header-actions");if(!host||document.getElementById("installApp"))return;const button=document.createElement("button");button.id="installApp";button.type="button";button.className="secondary-action install-app-button";const arabic=document.querySelector(".app-shell")?.dir==="rtl";button.textContent=arabic?"تثبيت التطبيق":"Install app";button.onclick=async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;button.remove()};host.prepend(button)}const installObserver=new MutationObserver(()=>{if(installPrompt)mountInstall()});installObserver.observe(document.documentElement,{childList:true,subtree:true});
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
  ip.href="./index.html#calculators";
  ip.dataset.mode="ip";
  ip.textContent=document.documentElement.lang==="ar"?"كاميرات IP":"IP camera planner";
  const analog=document.createElement("a");
  analog.href="./analog.html";
  analog.dataset.mode="analog";
  analog.className="analog-nav-link";
  analog.textContent=document.documentElement.lang==="ar"?"كاميرات Analog":"Analog camera planner";
  mode.append(ip,analog);
  page.prepend(mode);
  mode.querySelectorAll("a").forEach(link=>link.addEventListener("click",event=>{
   if(event.ctrlKey||event.metaKey||event.shiftKey)return;
   event.preventDefault();
   const href=link.getAttribute("href");
   document.body.classList.add("page-leave");
   setTimeout(()=>location.href=href,160);
  }));
 }else{
  const links=mode.querySelectorAll("a");
  if(links[0])links[0].textContent=document.documentElement.lang==="ar"?"كاميرات IP":"IP camera planner";
  if(links[1])links[1].textContent=document.documentElement.lang==="ar"?"كاميرات Analog":"Analog camera planner";
 }
 return true;
}
const cameraModeObserver=new MutationObserver(()=>mountCameraModeSwitch());
cameraModeObserver.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["lang"]});
mountCameraModeSwitch();
