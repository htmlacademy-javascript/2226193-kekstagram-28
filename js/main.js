const DESCRIPTIONS = [
  'Красоты Болгарии',
  'Лучшее место в Египте',
  'Мыс в Альгарве',
  'По дороге из Порту до Лиссабона',
  'Прекрасный Мадрид',
  'Тунис зимой',

];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван Иванов',
  'Петр Измайлов',
  'Елена Моисеева',
  'Марат Эзопов',
  'Борис Нахлебников',
  'Лида Мизинцева'
];

const PHOTO_COUNT = 25;

/* Вспомогательные функции */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createIdGenerator();
const generatePhotoNumber = createIdGenerator();
const generateCommentId = createRandomIdFromRangeGenerator(1, 999);

/* Генерация комментария */
const generateComment = () => ({
  id: generateCommentId(),
  avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

/* Генерация описания и комментариев к фотографии */
const generatePhotoDescription = () => {
  const commentsNumber = getRandomInteger(1, 3);
  const photoComments = Array.from({length: commentsNumber},generateComment);

  return {
    id: generatePhotoId(),
    url: 'photos/' + generatePhotoNumber() + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(14, 200),
    comments: photoComments,
  };
};

/* Генерируем нужное количество фотографий с описанием */
const generatePhotos = Array.from({length: PHOTO_COUNT}, generatePhotoDescription);
/* stylelint-disable-next-line no-console */
console.log(generatePhotos);
