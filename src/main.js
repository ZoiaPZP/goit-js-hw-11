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

const loadingSpinner = document.getElementById("loading-spinner");
const showLoadingSpinner = () => (loadingSpinner.style.display = "block");
const hideLoadingSpinner = () => (loadingSpinner.style.display = "none");

const hideLoadMoreBtn = () => {
  if (elem.loadMoreBtn) {
    elem.loadMoreBtn.style.display = "none";
  } else {
    console.warn("Елемент loadMoreBtn не знайдено.");
  }
};
const showLoadMoreBtn = () => {
  if (elem.loadMoreBtn) {
    elem.loadMoreBtn.style.display = "block";
  } else {
    console.warn("Елемент loadMoreBtn не знайдено.");
  }
};

hideLoadMoreBtn();

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 200,
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Notiflix === 'undefined') {
    console.error("Notiflix не завантажено!");
  } else {
    Notiflix.Notify.init({
      position: 'right-bottom',
      clickToClose: true,
      timeout: 3000,
    });
    console.log("Notiflix завантажено успішно!");
  }
});

async function submit(evt) {
  evt.preventDefault();
  console.log("Подія submit викликана.");

  if (!elem || !elem.input) {
    console.error("Елемент input не знайдено у об'єкті elem.");
    if (Notiflix.Notify) {
      Notiflix.Notify.failure("Сталася помилка. Перевірте код.");
    }
    return;
  }

  const text = elem.input.value.trim();
  console.log("Текст пошуку:", text);

  if (!text) {
    hideLoadMoreBtn();
    if (Notiflix.Notify) {
      Notiflix.Notify.failure("Будь ласка, введіть запит для пошуку.");
    }
    return;
  }

  page = 1;
  clearGallery();
  showLoadingSpinner();

  try {
    console.log("Відправляємо запит до API...");
    const galleryItems = await service(text, page, perPage);

    if (!galleryItems?.data?.hits?.length) {
      iziToast.error({ title: "Помилка", message: "Зображення не знайдено." });
      return;
    }

    const totalHits = galleryItems.data.totalHits;
    console.log("Знайдено зображень:", totalHits);

    if (totalHits <= perPage) {
      hideLoadMoreBtn();
    } else {
      showLoadMoreBtn();
    }

    if (Notiflix.Notify) {
      Notiflix.Notify.success(`Ура! Знайдено ${totalHits} зображень.`);
    }
    renderMarkup(galleryItems.data.hits);
    lightbox.refresh();
  } catch (error) {
    handleApiError(error);
  } finally {
    hideLoadingSpinner();
  }
}

async function onClickBtn() {
  console.log("Натиснута кнопка 'Load More'.");

  page += 1;

  if (!elem || !elem.input) {
    console.error("Елемент input не знайдено у об'єкті elem.");
    if (Notiflix.Notify) {
      Notiflix.Notify.failure("Сталася помилка. Перевірте код.");
    }
    return;
  }

  const text = elem.input.value.trim();
  console.log("Текст пошуку для додаткового завантаження:", text);

  try {
    const galleryItems = await service(text, page, perPage);

    if (!galleryItems?.data?.hits?.length) {
      hideLoadMoreBtn();
      if (Notiflix.Notify) {
        Notiflix.Notify.failure("Більше результатів немає.");
      }
      return;
    }

    renderMarkup(galleryItems.data.hits);
    lightbox.refresh();
  } catch (error) {
    handleApiError(error);
  }
}

function handleApiError(error) {
  console.error("Помилка при виконанні запиту:", error);

  if (error.response) {
    console.error("Дані відповіді з помилкою:", error.response.data);
    if (Notiflix.Notify) {
      Notiflix.Notify.failure(
        `Помилка: ${error.response.data?.message || "Сервер не відповідає."}`
      );
    }
  } else if (error.message) {
    console.error("Технічна помилка:", error.message || error);
    if (Notiflix.Notify) {
      Notiflix.Notify.failure("Сталася помилка при з'єднанні з сервером.");
    }
  } else {
    console.error("Невідома помилка:", error);
    if (Notiflix.Notify) {
      Notiflix.Notify.failure("Невідома помилка.");
    }
  }
}

if (elem?.form) {
  elem.form.addEventListener("submit", submit);
} else {
  console.error("Елемент form не знайдено у об'єкті elem.");
}

if (elem?.loadMoreBtn) {
  elem.loadMoreBtn.addEventListener("click", onClickBtn);
} else {
  console.error("Елемент loadMoreBtn не знайдено у об'єкті elem.");
}








































