import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as yup from 'yup';
import onChange from 'on-change';
import handlers from './handlers';
import render from './render';
import locales from './locales';

export default () => {
  i18next.use(LanguageDetector).init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: locales.ru,
      en: locales.en,
    },
  });

  yup.setLocale({
    mixed: {
      required: ({ url }) => ({ key: 'feedback.empty', values: { url } }),
    },
    string: {
      url: ({ url }) => ({ key: 'feedback.invalidUrl', values: { url } }),
    },
  });

  const state = {
    feeds: [],
    posts: [],
    uiState: {
      status: 'pending',
      feedbackKey: '',
    },
  };

  document.body.innerHTML = render.doc();

  const form = document.querySelector('form');
  const input = document.querySelector('.form-control');
  const button = document.querySelector('[type=submit]');
  const feedback = document.querySelector('.feedback');
  const postsFeedsContainer = document.querySelector('#posts_feeds');
  const feedsContainer = document.querySelector('#feeds');
  const postsContainer = document.querySelector('#posts');

  const view = {
    invalid: (value) => {
      document.querySelector('form').reset();
      input.classList.add('is-invalid');
      input.removeAttribute('readonly');
      feedback.classList.add('text-danger');
      feedback.classList.remove('text-success');
      feedback.textContent = i18next.t(value.feedbackKey);
      button.disabled = false;
    },
    valid: (value) => {
      postsFeedsContainer.classList.add('bg-light', 'border', 'border-1', 'rounded', 'mt-2', 'py-2', 'px-3');
      document.querySelector('form').reset();
      button.disabled = false;
      input.removeAttribute('readonly');
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      feedback.textContent = i18next.t(value.feedbackKey);
    },
    pending: () => {
      input.classList.remove('is-invalid');
      input.setAttribute('readonly', true);
      feedback.textContent = '';
      button.disabled = true;
    },
  };

  const watchedState = onChange(state, (path, value) => {
    if (path === 'uiState') {
      switch (value.status) {
        case 'pending':
          view.pending();
          break;
        case 'invalid':
          view.invalid(value);
          break;
        case 'complete':
          view.valid(value);
          break;
        case 'networkError':
          view.invalid(value);
          break;
        default:
          throw new Error('got into default in switch');
      }
    }

    if (path === 'posts') {
      postsContainer.innerHTML = render.posts(value);
      return;
    }

    if (path === 'feeds') {
      feedsContainer.innerHTML = render.feeds(value);
    }
  });

  form.addEventListener('submit', handlers.formSubmit(watchedState));
  postsContainer.addEventListener('click', handlers.postButton(watchedState));
};
