import{a as b,S as N,N as e}from"./assets/vendor-DKgH0KKA.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();async function m(n,o=1,a=40){const i="https://pixabay.com/api/",t="48018775-66f870a0a55ddc658d7ca6c06",r=new URLSearchParams({key:t,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:a});try{return await b.get(`${i}?${r}`)}catch(s){console.log(s)}}const l={galleryDiv:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),form:document.querySelector(".search-form"),input:document.querySelector(".input"),submitBtn:document.querySelector(".submit-btn")};function p(n){l.galleryDiv.insertAdjacentHTML("beforeend",S(n))}function S(n){return n.map(({webformatURL:o,largeImageURL:a,tags:i,likes:t,views:r,comments:s,downloads:h})=>`
    <div class="photo-card">
      <a href="${a}">
        <img
          class="gallery-image img"
          src="${o}"
          alt="${i}"
          loading="lazy"
        />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${t}</b>
        </p>
        <p class="info-item">
          <b>Views: ${r}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${s}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${h}</b>
        </p>
      </div>
    </div>
    `).join("")}let c=1;const f=40,g=document.getElementById("loading-spinner"),v=()=>{g.style.display="block"},L=()=>{g.style.display="none"},u=()=>l.loadMoreBtn.style.display="none",P=()=>l.loadMoreBtn.style.display="block";u();const y=new N(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:200});async function w(n){n.preventDefault();let o=l.form.elements.searchQuery.value.trim();if(c=1,d(),o===""){u(),e&&e.Notify&&e.Notify.failure("Sorry, there are no images matching your search query. Please try again.");return}v();try{const a=await m(o,c,f);let i=a.data.totalHits;a.data.hits.length===0?(d(),e&&e.Notify&&e.Notify.failure("Sorry, there are no images matching your search query. Please try again.")):i>=1&&i<f?(u(),e&&e.Notify&&e.Notify.success(`Hooray! We found ${i} image.`)):i>f&&(P(),e&&e.Notify&&e.Notify.success(`Hooray! We found ${i} image.`)),p(a.data.hits),y.refresh()}catch(a){console.log(a),e&&e.Notify&&e.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}L(),y.refresh()}async function q(){c+=1;let n=l.form.elements.searchQuery.value;try{const o=await m(n,c,f);o.data.totalHits/f<=c&&(u(),e&&e.Notify&&e.Notify.failure("We're sorry, but you've reached the end of search results.")),p(o.data.hits)}catch{e&&e.Notify&&e.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}y.refresh()}function d(){l.galleryDiv.innerHTML="",c=1,u()}l.form.addEventListener("submit",w);l.loadMoreBtn.addEventListener("click",q);
//# sourceMappingURL=index.js.map
