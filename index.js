import{a as M,S as v,N as c,i as b}from"./assets/vendor-COPdusF7.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();async function f(i,a=1,s=40){const r="https://pixabay.com/api/",e="48018775-66f870a0a55ddc658d7ca6c06",o=new URLSearchParams({key:e,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:s});console.log("Запит до API:",`${r}?${o}`);try{const n=await M.get(`${r}?${o}`);return console.log("Успішна відповідь від API:",n.data),n}catch(n){throw console.error("Помилка у запиті API:",n),n}}const t={form:document.getElementById("search-form"),input:document.querySelector(".input"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};t.gallery||console.error("Gallery not found in the DOM");t.loadMoreBtn||console.error("'Load More' button not found in the DOM");t.form||console.error("Form not found in the DOM");t.input||console.error("Input field not found in the DOM");function y(i,a){const s=t.gallery,r=i.map(n=>`
        <div class="gallery-item hidden">
          <a href="${n.largeImageURL}">
            <img src="${n.webformatURL}" alt="${n.tags}" class="gallery-image" loading="lazy" />
          </a>
          <p>${n.tags}</p>
        </div>
      `).join("");s.insertAdjacentHTML("beforeend",r);const e=s.querySelectorAll(".gallery-item img");let o=0;e.forEach(n=>{n.addEventListener("load",()=>{o+=1,o===e.length&&(s.querySelectorAll(".hidden").forEach(L=>L.classList.remove("hidden")),a&&a())})})}function N(){t.gallery.innerHTML=""}let l=1;const u=40,g=document.getElementById("loading-indicator"),m=()=>g.style.display="block",p=()=>g.style.display="none",d=()=>{var i;return(i=t==null?void 0:t.loadMoreBtn)==null?void 0:i.classList.add("load-more-hidden")},P=()=>{var i;return(i=t==null?void 0:t.loadMoreBtn)==null?void 0:i.classList.remove("load-more-hidden")};d();const h=new v(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:200});document.addEventListener("DOMContentLoaded",()=>{c.Notify.init({position:"right-bottom",clickToClose:!0,timeout:3e3})});async function S(i){var s,r;i.preventDefault();const a=t.input.value.trim();if(!a){d(),c.Notify.failure("Please enter a search query.");return}l=1,N(),m();try{const e=await f(a,l,u);if(!((r=(s=e==null?void 0:e.data)==null?void 0:s.hits)!=null&&r.length)){b.error({title:"Error",message:"No images found."});return}const o=e.data.totalHits;o>u?P():d(),c.Notify.success(`Success! Found ${o} images.`),y(e.data.hits,()=>h.refresh())}catch{c.Notify.failure("An error occurred. Please try again.")}finally{p()}}async function B(){var a,s;l+=1;const i=t.input.value.trim();m();try{const r=await f(i,l,u);if(!((s=(a=r==null?void 0:r.data)==null?void 0:a.hits)!=null&&s.length)){d(),c.Notify.failure("No more results.");return}y(r.data.hits,()=>h.refresh())}catch{c.Notify.failure("An error occurred while loading more images.")}finally{p()}}t!=null&&t.form&&t.form.addEventListener("submit",S);t!=null&&t.loadMoreBtn&&t.loadMoreBtn.addEventListener("click",B);
//# sourceMappingURL=index.js.map
