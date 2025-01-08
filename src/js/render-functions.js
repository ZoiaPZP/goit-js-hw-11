export const elem = {
  form: document.getElementById("search-form"),
  input: document.querySelector(".input"),
  gallery: document.querySelector(".gallery"),
  loadMoreBtn: document.querySelector(".load-more"),
};

if (!elem.gallery) console.error("Gallery not found in the DOM");
if (!elem.loadMoreBtn) console.error("'Load More' button not found in the DOM");
if (!elem.form) console.error("Form not found in the DOM");
if (!elem.input) console.error("Input field not found in the DOM");

export function renderMarkup(items, callback) {
  const gallery = elem.gallery;
  const markup = items
    .map(
      item => `
        <div class="gallery-item hidden">
          <a href="${item.largeImageURL}">
            <img src="${item.webformatURL}" alt="${item.tags}" class="gallery-image" loading="lazy" />
          </a>
          <p>${item.tags}</p>
        </div>
      `
    )
    .join('');
  gallery.insertAdjacentHTML("beforeend", markup);

  
  const images = gallery.querySelectorAll(".gallery-item img");
  let loadedCount = 0;

  images.forEach(img => {
    img.addEventListener("load", () => {
      loadedCount += 1;
      if (loadedCount === images.length) {
        gallery.querySelectorAll(".hidden").forEach(item => item.classList.remove("hidden"));
        if (callback) callback();
      }
    });
  });
}

export function clearGallery() {
  elem.gallery.innerHTML = "";
}




