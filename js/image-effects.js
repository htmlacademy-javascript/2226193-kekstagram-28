const EFFECTS = {
  none: {
    filter: 'none',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    unit: '',
  },
};

const DEFAULT_EFFECT = EFFECTS.none;
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
    range: chosenEffect.range,
    step: chosenEffect.step,
    start: chosenEffect.range.max,
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

  chosenEffect = EFFECTS[evt.target.value];
  previewImage.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

// Обработка движения слайдера (изменения интенсивности применения выбранного эффекта)

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectValue.value = sliderValue;
  previewImage.style.filter = isDefault() ? DEFAULT_EFFECT.filter : `${chosenEffect.filter}(${sliderValue}${chosenEffect.unit})`;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

// Изначальное создание и скрытие слайдера

noUiSlider.create(sliderElement, {
  range: DEFAULT_EFFECT.range,
  start: DEFAULT_EFFECT.range.max,
  step: DEFAULT_EFFECT.step,
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
