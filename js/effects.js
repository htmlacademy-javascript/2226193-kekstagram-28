const Effects = [
  {
    NAME: 'none',
    FILTER: 'none',
    RANGE: {
      min: 0,
      max: 100,
    },
    STEP: 1,
    UNIT: '',
  },
  {
    NAME: 'chrome',
    FILTER: 'grayscale',
    RANGE: {
      min: 0,
      max: 1,
    },
    STEP: 0.1,
    UNIT: '',
  },
  {
    NAME: 'sepia',
    FILTER: 'sepia',
    RANGE: {
      min: 0,
      max: 1,
    },
    STEP: 0.1,
    UNIT: '',
  },
  {
    NAME: 'marvin',
    FILTER: 'invert',
    RANGE: {
      min: 0,
      max: 100,
    },
    STEP: 1,
    UNIT: '%',
  },
  {
    NAME: 'phobos',
    FILTER: 'blur',
    RANGE: {
      min: 0,
      max: 3,
    },
    STEP: 0.1,
    UNIT: 'px',
  },
  {
    NAME: 'heat',
    FILTER: 'brightness',
    RANGE: {
      min: 1,
      max: 3,
    },
    STEP: 0.1,
    UNIT: '',
  },
];

const DEFAULT_EFFECT = Effects[0];
let chosenEffect = DEFAULT_EFFECT;

const previewImage = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

// Обновление параметров слайдера при выборе другого эффекта

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: chosenEffect.RANGE,
    step: chosenEffect.STEP,
    start: chosenEffect.RANGE.max,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

// Обработка смены выбранного эффекта

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  chosenEffect = Effects.find((effect) => effect.NAME === evt.target.value);
  previewImage.className = `effects__preview--${chosenEffect.NAME}`;
  updateSlider();
};

// Обработка движения слайдера (изменения интенсивности применения выбранного эффекта)

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  previewImage.style.filter = isDefault()
    ? DEFAULT_EFFECT.FILTER
    : `${chosenEffect.FILTER}(${sliderValue}${chosenEffect.UNIT})`;
  effectValue.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

// Изначальное создание и скрытие слайдера

noUiSlider.create(sliderElement, {
  range: DEFAULT_EFFECT.RANGE,
  start: DEFAULT_EFFECT.RANGE.max,
  step: DEFAULT_EFFECT.STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
hideSlider();

// Обработчики событий

effects.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
