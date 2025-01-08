import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.1.0.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "./css/common.css";
import "./css/styles.css";
import { service } from "./js/pixabay-api.js";
import { elem, renderMarkup, clearGallery } from "./js/render-functions.js";

let page = 1;
const perPage = 40;

// Показ та приховування індикатора завантаження
const loadingIndicator = document.getElementById("loading-indicator");
const showLoadingSpinner = () => (loadingIndicator.style.display = "block");
const hideLoadingSpinner = () => (loadingIndicator.style.display = "none");

const hideLoadMoreBtn = () => elem?.loadMoreBtn?.classList.add("load-more-hidden");
const showLoadMoreBtn = () => elem?.loadMoreBtn?.classList.remove("load-more-hidden");

hideLoadMoreBtn();

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 200,
});

document.addEventListener("DOMContentLoaded", () => {
  Notiflix.Notify.init({
    position: "right-bottom",
    clickToClose: true,
    timeout: 3000,
  });
});

async function submit(evt) {
  evt.preventDefault();
  const text = elem.input.value.trim();
  if (!text) {
    hideLoadMoreBtn();
    Notiflix.Notify.failure("Будь ласка, введіть запит для пошуку.");
    return;
  }

  page = 1;
  clearGallery();
  showLoadingSpinner();

  try {
    const galleryItems = await service(text, page, perPage);
    if (!galleryItems?.data?.hits?.length) {
      iziToast.error({ title: "Помилка", message: "Зображення не знайдено." });
      return;
    }

    const totalHits = galleryItems.data.totalHits;
    totalHits > perPage ? showLoadMoreBtn() : hideLoadMoreBtn();

    Notiflix.Notify.success(`Ура! Знайдено ${totalHits} зображень.`);
    renderMarkup(galleryItems.data.hits);
    lightbox.refresh();
  } catch (error) {
    Notiflix.Notify.failure("Сталася помилка. Спробуйте ще раз.");
  } finally {
    hideLoadingSpinner();
  }
}

async function onClickBtn() {
  page += 1;
  const text = elem.input.value.trim();
  showLoadingSpinner();

  try {
    const galleryItems = await service(text, page, perPage);
    if (!galleryItems?.data?.hits?.length) {
      hideLoadMoreBtn();
      Notiflix.Notify.failure("Більше результатів немає.");
      return;
    }

    renderMarkup(galleryItems.data.hits);
    lightbox.refresh();
  } catch (error) {
    Notiflix.Notify.failure("Сталася помилка при завантаженні додаткових зображень.");
  } finally {
    hideLoadingSpinner();
  }
}

if (elem?.form) elem.form.addEventListener("submit", submit);
if (elem?.loadMoreBtn) elem.loadMoreBtn.addEventListener("click", onClickBtn);









































