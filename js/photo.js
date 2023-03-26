import {isEscapeKey, isEnterKey} from './util.js';

const COMMENTS_LOAD_COUNT = 5;

const body = document.querySelector('body');
const fullSizePhotoModal = document.querySelector('.big-picture');
const photoModalClose = fullSizePhotoModal.querySelector('.cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');

let comments = [];
let commentsShown = 0;

const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="{{аватар}}" alt="{{имя комментатора}}" width="35" height="35"> <p class="social__text">{{текст комментария}}</p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (data) => {
  comments = data;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const closeFullSizePhotoModal = () => {
  commentsShown = 0;
  fullSizePhotoModal.classList.add('hidden');
  body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onLoadMoreClick);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onModalEscKeydown);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onModalCloseEnterKeydown);
};

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhotoModal();
  }
};

const onModalCloseClick = () => {
  closeFullSizePhotoModal();
};

const onModalCloseEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    closeFullSizePhotoModal();
  }
};

const onLoadMoreClick = () => {
  commentsShown += COMMENTS_LOAD_COUNT;
  renderComments(comments);
};

const renderPhotoDetails = ({url, description, likes}) => {
  fullSizePhotoModal.querySelector('.big-picture__img img').src = url;
  fullSizePhotoModal.querySelector('.big-picture__img img').alt = description;
  fullSizePhotoModal.querySelector('.social__caption').textContent = description;
  fullSizePhotoModal.querySelector('.likes-count').textContent = likes;
};

const openFullSizePhotoModal = (picture) => {
  fullSizePhotoModal.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('keydown', onModalCloseEnterKeydown);
  document.addEventListener('click', onLoadMoreClick);

  renderPhotoDetails(picture);
  renderComments(picture.comments);
};

photoModalClose.addEventListener('click', onModalCloseClick);

export {openFullSizePhotoModal};
