import {isEscapeKey, isEnterKey} from './util.js';

const COMMENTS_LOAD_COUNT = 5;

const body = document.querySelector('body');
const fullSizePhotoModal = document.querySelector('.big-picture');
const photoModalClose = fullSizePhotoModal.querySelector('.cancel');
const commentCount = fullSizePhotoModal.querySelector('.social__comment-count');
const commentsList = fullSizePhotoModal.querySelector('.social__comments');
const commentsLoader = fullSizePhotoModal.querySelector('.comments-loader');
const commentTemplate = fullSizePhotoModal.querySelector('.social__comment');

let comments;
let commentsShown = 0;

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  if (commentsShown >= comments.length) {
    commentsShown = comments.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  comments.slice(0, commentsShown).forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.innerHTML = '';
  commentsList.append(fragment);
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

  comments = picture.comments;

  renderPhotoDetails(picture);
  renderComments(comments);
};

photoModalClose.addEventListener('click', onModalCloseClick);

export {openFullSizePhotoModal};
