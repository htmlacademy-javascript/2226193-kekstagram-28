import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const successInner = successMessage.querySelector('.success__inner');

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const errorInner = errorMessage.querySelector('.error__inner');

// Закрытие сообщения об успехе

const closeSuccessMessage = () => {
  successMessage.remove();

  document.removeEventListener('keydown', onEscKeydownSuccess);
  document.removeEventListener('click', onAnyClickSuccess);
  successButton.removeEventListener('click', onSuccessButtonClick);
};

function onEscKeydownSuccess (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeSuccessMessage();
  }
}

function onSuccessButtonClick () {
  closeSuccessMessage();
}

function onAnyClickSuccess (evt) {
  if (evt.target !== successInner) {
    closeSuccessMessage();
  }
}

// Показ сообщения об успехе

const showSuccessMessage = () => {
  document.body.append(successMessage);

  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onEscKeydownSuccess);
  document.addEventListener('click', onAnyClickSuccess);
};

// Закрытие сообщения об ошибке

const closeErrorMessage = () => {
  errorMessage.remove();

  document.removeEventListener('keydown', onEscKeydownError);
  document.removeEventListener('click', onAnyClickError);
  errorButton.removeEventListener('click', onErrorButtonClick);
};

function onEscKeydownError (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeErrorMessage();
  }
}

function onErrorButtonClick () {
  closeErrorMessage();
}

function onAnyClickError (evt) {
  if (evt.target !== errorInner) {
    closeErrorMessage();
  }
}

// Показ сообщения об ошибке

const showErrorMessage = () => {
  document.body.append(errorMessage);

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onEscKeydownError);
  document.addEventListener('click', onAnyClickError);
};

export {showSuccessMessage, showErrorMessage};
