import {renderThumbnails} from './thumbnail.js';
import {debounce} from './util.js';

const PICTURES_COUNT_TO_SHOW = 10;
const TIMEOUT = 500;

const filters = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const showFilters = () => filters.classList.remove('img-filters--inactive');

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = (pictures, filterButton) => {
  switch (filterButton) {
    case filterRandomButton:
      return pictures.slice().sort(sortRandomly).slice(0, PICTURES_COUNT_TO_SHOW);
    case filterDiscussedButton:
      return pictures.slice().sort(sortByComments);
    default:
      return pictures;
  }
};

const removeThumbnails = (thumbnails) => thumbnails.forEach((thumbnail) => thumbnail.remove());

// Обработка смены фильтра картинок

const onFilterButtonClick = (evt, pictures) => {
  const thumbnails = document.querySelectorAll('.picture');
  const filterButton = evt.target;

  filterDefaultButton.classList.remove('img-filters__button--active');
  filterRandomButton.classList.remove('img-filters__button--active');
  filterDiscussedButton.classList.remove('img-filters__button--active');
  filterButton.classList.add('img-filters__button--active');

  removeThumbnails(thumbnails);
  renderThumbnails(getFilteredPictures(pictures, filterButton));
};

// Таймаут на перерисовку галерии миниатюр при смене фильтра

const setupFiltering = (pictures) => {
  filterForm.addEventListener('click', debounce((evt) => {
    onFilterButtonClick(evt, pictures);
  }, TIMEOUT));
};

export {setupFiltering, showFilters};
