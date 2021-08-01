import _ from 'lodash';
import i18next from 'i18next';

export default (watchedState) => (e) => {
  const { id } = e.target.dataset;
  const linkElement = document.querySelector(`a[data-id='${id}']`);
  const link = linkElement.href;
  const post = _.find(watchedState.posts, { link });
  post.isRead = true;
  linkElement.classList.remove('fw-bold');
  linkElement.classList.add('fw-normal');

  const modal = document.querySelector('#modal');

  modal.querySelector('h5').textContent = post.title;
  modal.querySelector('.modal-body p').textContent = post.description;
  modal.querySelector('.modal-footer a').textContent = i18next.t('buttons.modal.continue');
  modal.querySelector('.modal-footer button').textContent = i18next.t('buttons.modal.close');
  modal.querySelector('.modal a').href = post.link;
};
