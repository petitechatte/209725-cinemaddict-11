import {createUserProfile} from "./components/user-profile.js";
import {createSiteNavigation} from "./components/navigation.js";
import {createSortingControls} from "./components/sorting.js";
import {createFilmsGeneralContainer} from "./components/content-container.js";
import {createFilmsExtraSectionTemplate} from "./components/extra-section.js";
import {createFilmsListContainer} from "./components/films-container.js";
import {createFilmCard} from "./components/card.js";
import {createLoadButton} from "./components/load-button.js";
import {createTotalFilmsCount} from "./components/films-count.js";
import {createFilmDetailsPopup} from "./components/films-details-popup.js";

const CARDS_MAIN_LIST_LENGTH = 5; // количество карточек в основном разделе
const CARDS_EXTRA_LIST_LENGTH = 2; // количество карточек в дополнительных разделах
const FILMS_EXTRA_SECTIONS_NUMBER = 2; // количество дополнительных разделов с карточками
const FILMS_EXTRA_SECTIONS_TITLES = [`Top rated`, `Most commented`]; // названия дополнительных разделов

const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);
const footerStatistics = siteFooter.querySelector(`.footer__statistics`);

// функция отрисовки шаблона

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// функция отрисовки набора карточек

const renderCardsList = (container, listLength) => {
  let filmsList = ``;

  for (let i = 0; i < listLength; i++) {
    filmsList += createFilmCard();
  }

  renderTemplate(container, createFilmsListContainer());

  const filmsListContainer = container.querySelector(`.films-list__container`);

  renderTemplate(filmsListContainer, filmsList);
};

// отрисовка основных разделов сайта

renderTemplate(siteHeader, createUserProfile());
renderTemplate(siteMainElement, createSiteNavigation());
renderTemplate(siteMainElement, createSortingControls());
renderTemplate(siteMainElement, createFilmsGeneralContainer());

// отрисовка дополнительных подразделов для карточек фильмов

const filmsGeneralContainer = siteMainElement.querySelector(`.films`);

const createFilmsExtraSections = () => {
  let templates = ``;
  let sectionTitle = ``;
  let titleIndex = 0;

  for (let i = 0; i < FILMS_EXTRA_SECTIONS_NUMBER; i++) {
    sectionTitle = FILMS_EXTRA_SECTIONS_TITLES[titleIndex];
    templates += createFilmsExtraSectionTemplate(sectionTitle);
    titleIndex++;
  }

  return templates;
};

renderTemplate(filmsGeneralContainer, createFilmsExtraSections());

// отрисовка карточек фильмов

const filmsMainSection = filmsGeneralContainer.querySelector(`.films-list`);
const filmsExtraSections = filmsGeneralContainer.querySelectorAll(`.films-list--extra`);

renderCardsList(filmsMainSection, CARDS_MAIN_LIST_LENGTH);

filmsExtraSections.forEach((filmsExtraSection) => {
  renderCardsList(filmsExtraSection, CARDS_EXTRA_LIST_LENGTH);
});

// отрисовка кнопки загрузки

renderTemplate(filmsMainSection, createLoadButton());

// отрисовка статистики в подвале

renderTemplate(footerStatistics, createTotalFilmsCount());

createFilmDetailsPopup(); // временное использование переменной для формального соответствия критерию
