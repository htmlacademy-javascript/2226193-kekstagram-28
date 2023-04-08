import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';

const MAX_HASHTAG_COUNT = 5;

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay');
const image = uploadForm.querySelector('#upload-file');
const imageModalCloseButton = imageOverlay.querySelector('#upload-cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

// Открытие окна редактирования изображения

const openEditImageModal = () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  // eslint-disable-next-line no-use-before-define
  document.addEventListener('keydown', onEscKeydown);
  // eslint-disable-next-line no-use-before-define
  imageModalCloseButton.addEventListener('click', onModalCloseClick);
};

// Закрытие окна редактирования изображения

const closeEditImageModal = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();

  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscKeydown);
};

// Обработка открытия окна редактирования

const onFileInputChange = () => {
  openEditImageModal();
};

// Обработка закрытия окна редактирования

const onEscKeydown = (evt) => {
  const isTextFieldFocused = document.activeElement === hashtagField || document.activeElement === commentField;

  if (isEscapeKey(evt) && !isTextFieldFocused) {
    evt.preventDefault();

    closeEditImageModal();
  }
};

const onModalCloseClick = () => {
  closeEditImageModal();
};

// Проверка длины комментария

const isCommentFieldValid = (value) => value.length <= 140;

pristine.addValidator(
  commentField,
  isCommentFieldValid,
  'Комментарий не может превышать 140 символов'
);

// Получение массива хештегов

const getHashtags = (value) => {
  const hashtags = value.trim().split(' ').filter((hashtag) => hashtag.trim().length);
  return hashtags;
};

// Проверка формата хештегов

const isHashtagValid = (hashtag) => {
  const hashtagRule = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtagRule.test(hashtag);
};

const validateHashtags = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every(isHashtagValid);
};

pristine.addValidator(
  hashtagField,
  validateHashtags,
  'Хештег не соответствует формату'
);

// Проверка отсутствия дублей хештегов

const isHashtagUnique = (value) => {
  const hashtags = getHashtags(value);
  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

pristine.addValidator(
  hashtagField,
  isHashtagUnique,
  'Хештеги не должны повторяться'
);

// Проверка количества хештегов

const isHashtagsCountValid = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

pristine.addValidator(
  hashtagField,
  isHashtagsCountValid,
  'Добавить можно не более 5 хештегов'
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Обработчик отправки формы

const setOnUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await onSuccess (new FormData(evt.target));
      unblockSubmitButton();
    }
  });
};

image.addEventListener('change', onFileInputChange);

export {closeEditImageModal, setOnUploadFormSubmit};
