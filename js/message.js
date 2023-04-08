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

  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscKeydownSuccess);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onAnyClickSuccess);
  // eslint-disable-next-line no-use-before-define
  successButton.removeEventListener('click', onSuccessButtonClick);
};

const onEscKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeSuccessMessage();
  }
};

const onSuccessButtonClick = () => {
  closeSuccessMessage();
};

const onAnyClickSuccess = (evt) => {
  if (evt.target !== successInner) {
    closeSuccessMessage();
  }
};

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

  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscKeydownError);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onAnyClickError);
  // eslint-disable-next-line no-use-before-define
  errorButton.removeEventListener('click', onErrorButtonClick);
};

const onEscKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeErrorMessage();
  }
};

const onErrorButtonClick = () => {
  closeErrorMessage();
};

const onAnyClickError = (evt) => {
  if (evt.target !== errorInner) {
    closeErrorMessage();
  }
};

// Показ сообщения об ошибке

const showErrorMessage = () => {
  document.body.append(errorMessage);

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onEscKeydownError);
  document.addEventListener('click', onAnyClickError);
};

export {showSuccessMessage, showErrorMessage};
