import {isEscapeKey} from './util.js';
import {resetScale} from './image-scale.js';
import {resetEffects} from './image-effects.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const uploadImage = document.querySelector('.img-upload__preview img');
const imageModalCloseButton = imageOverlay.querySelector('#upload-cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

// Открытие окна редактирования изображения

const openEditImageModal = () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetScale();

  document.addEventListener('keydown', onEscKeydown);
  imageModalCloseButton.addEventListener('click', onModalCloseClick);
};

// Закрытие окна редактирования изображения

const closeEditImageModal = () => {
  uploadForm.reset();
  pristine.reset();
  resetEffects();

  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

// Загрузка изображения для редактирования

const onImageUpload = () => {
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadImage.src = '';
    uploadImage.src = URL.createObjectURL(file);
  }
};

// Обработка открытия окна редактирования

const onFileInputChange = () => {
  openEditImageModal();
};

// Обработка закрытия окна редактирования

function onEscKeydown (evt) {
  const isTextFieldFocused = document.activeElement === hashtagField || document.activeElement === commentField;
  const errorPopup = document.querySelector('.error');

  if (!errorPopup && isEscapeKey(evt) && !isTextFieldFocused) {
    evt.preventDefault();

    closeEditImageModal();
  }
}

function onModalCloseClick () {
  closeEditImageModal();
}

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

// Блокировка и разблокировка кнопки при отправке формы

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Обработчик отправки формы

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(showErrorMessage)
        .finally(unblockSubmitButton);
    }
  });
};

uploadFileInput.addEventListener('change', onFileInputChange);
uploadFileInput.addEventListener('change', onImageUpload);

export {closeEditImageModal, setUploadFormSubmit};
