const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const uploadImage = document.querySelector('.img-upload__preview img');

// Изменение размера изображения

const scaleImage = (value) => {
  uploadImage.style.transform = `scale(${value / 100})`;
};

// Обработка нажатия кнопки уменьшения размера изображения

const onZoomOutButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleValue.value = `${newValue}%`;
  scaleImage(newValue);
};

// Обработка нажатия кнопки увеличения размера изображения

const onZoomInButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleValue.value = `${newValue}%`;
  scaleImage(newValue);
};

const resetScale = () => {
  scaleValue.value = `${DEFAULT_SCALE}%`;
  scaleImage(DEFAULT_SCALE);
};

// Обработчики событий

zoomOutButton.addEventListener('click', onZoomOutButtonClick);
zoomInButton.addEventListener('click', onZoomInButtonClick);

export {resetScale};
