import{a as b,S as M,N as c,i as v}from"./assets/vendor-COPdusF7.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();async function f(r,i=1,a=40){const n="https://pixabay.com/api/",e="48018775-66f870a0a55ddc658d7ca6c06",t=new URLSearchParams({key:e,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:a});console.log("Запит до API:",`${n}?${t}`);try{const s=await b.get(`${n}?${t}`);return console.log("Успішна відповідь від API:",s.data),s}catch(s){throw console.error("Помилка у запиті API:",s),s}}const o={galleryDiv:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),form:document.querySelector(".search-form"),input:document.querySelector('.search-form input[name="searchQuery"]')};o.galleryDiv||console.error("Gallery not found in DOM");o.loadMoreBtn||console.error("Load More button not found in DOM");o.form||console.error("Form not found in DOM");o.input||console.error("Input field not found in DOM");function D(){o.galleryDiv.innerHTML=""}function p(r){o.galleryDiv.insertAdjacentHTML("beforeend",N(r))}function N(r){return r.map(({webformatURL:i,largeImageURL:a,tags:n,likes:e,views:t,comments:s,downloads:L})=>`
        <div class="photo-card">
          <a href="${a}" class="gallery-image">
            <img src="${i}" alt="${n}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes: ${e}</b></p>
            <p class="info-item"><b>Views: ${t}</b></p>
            <p class="info-item"><b>Comments: ${s}</b></p>
            <p class="info-item"><b>Downloads: ${L}</b></p>
          </div>
        </div>
        `).join("")}let l=1;const u=40,m=document.getElementById("loading-indicator"),y=()=>m.style.display="block",h=()=>m.style.display="none",d=()=>{var r;return(r=o==null?void 0:o.loadMoreBtn)==null?void 0:r.classList.add("load-more-hidden")},P=()=>{var r;return(r=o==null?void 0:o.loadMoreBtn)==null?void 0:r.classList.remove("load-more-hidden")};d();const g=new M(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:200});document.addEventListener("DOMContentLoaded",()=>{c.Notify.init({position:"right-bottom",clickToClose:!0,timeout:3e3})});async function w(r){var a,n;r.preventDefault();const i=o.input.value.trim();if(!i){d(),c.Notify.failure("Please enter a search query.");return}l=1,D(),y();try{const e=await f(i,l,u);if(!((n=(a=e==null?void 0:e.data)==null?void 0:a.hits)!=null&&n.length)){v.error({title:"Error",message:"No images found."});return}const t=e.data.totalHits;t>u?P():d(),c.Notify.success(`Success! Found ${t} images.`),p(e.data.hits),g.refresh()}catch{c.Notify.failure("An error occurred. Please try again.")}finally{h()}}async function S(){var i,a;l+=1;const r=o.input.value.trim();y();try{const n=await f(r,l,u);if(!((a=(i=n==null?void 0:n.data)==null?void 0:i.hits)!=null&&a.length)){d(),c.Notify.failure("No more results.");return}p(n.data.hits),g.refresh()}catch{c.Notify.failure("An error occurred while loading more images.")}finally{h()}}o!=null&&o.form&&o.form.addEventListener("submit",w);o!=null&&o.loadMoreBtn&&o.loadMoreBtn.addEventListener("click",S);
//# sourceMappingURL=index.js.map
