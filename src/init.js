import i18next from 'i18next';
import * as yup from 'yup';
import onChange from 'on-change';
import _ from 'lodash';
import axios from 'axios';
import handlers from './handlers';
import parse from './parse';
import render from './render';
import locales from './locales';

const getAllOriginsUrl = (url) => (
  `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`
);

export default () => {
  i18next.init({
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
  const feedsContainer = document.querySelector('#feeds');
  const postsContainer = document.querySelector('#posts');
  console.log(form);
  console.log(document.body.innerHTML);
  button.textContent = i18next.t('buttons.form.add');

  const watchedState = onChange(state, (path, value) => {
    if (path === 'uiState') {
      console.log('got');
      switch (value.status) {
        case 'pending':
          input.classList.remove('is-invalid');
          input.setAttribute('readonly', true);
          feedback.textContent = '';
          button.disabled = true;
          break;
        case 'invalid':
          document.querySelector('form').reset();
          input.classList.add('is-invalid');
          input.removeAttribute('readonly');
          feedback.classList.add('text-danger');
          feedback.classList.remove('text-success');
          feedback.textContent = i18next.t(value.feedbackKey);
          button.disabled = false;
          break;
        case 'complete':
          document.querySelector('form').reset();
          button.disabled = false;
          input.removeAttribute('readonly');
          input.classList.remove('is-invalid');
          feedback.classList.remove('text-danger');
          feedback.classList.add('text-success');
          feedback.textContent = i18next.t(value.feedbackKey);
          break;
        case 'networkError':
          document.querySelector('form').reset();
          input.classList.add('is-invalid');
          input.removeAttribute('readonly');
          feedback.classList.add('text-danger');
          feedback.classList.remove('text-success');
          feedback.textContent = i18next.t(value.feedbackKey);
          button.disabled = false;
          break;
        default:
          throw new Error('got into default in switch');
      }
    }

    if (path === 'posts') {
      postsContainer.innerHTML = render.posts(value);
      const buttons = document.querySelectorAll('li button');
      buttons.forEach((b) => (
        b.addEventListener(
          'click',
          handlers.postButton(watchedState),
        )
      ));
      return;
    }

    if (path === 'feeds') {
      feedsContainer.innerHTML = render.feeds(value);
    }
  });

  const request = (id, url, makeStatus) => {
    axios
      .get(getAllOriginsUrl(url))
      .then((response) => {
        // if (!isRSS(response)) {
        //   watchedState.uiState = {
        //     status: 'invalid',
        //     feedbackKey: 'feedback.notRSS',
        //   };
        //   return;
        // }

        const parsedChannel = parse(response.data);
        const { items, title, description } = parsedChannel;
        const feed = {
          id, url, title, description,
        };
        const posts = items
          .map((item) => ({ ...item, feedId: id, id: _.uniqueId() }));
        const newPosts = _.differenceBy(posts, state.posts, 'link');

        watchedState.feeds = _.sortBy(_.uniqBy([
          feed,
          ...state.feeds,
        ], 'url'), 'id').reverse();
        watchedState.posts = _.uniqBy([
          ...newPosts,
          ...state.posts,
        ], 'link');

        if (makeStatus) watchedState.uiState = { status: 'complete', feedbackKey: 'feedback.complete' };
        setTimeout(() => request(id, url), 5000);
      })
      .catch((e) => {
        switch (e.message) {
          case 'Network Error':
            watchedState.uiState = { status: 'networkError', feedbackKey: 'feedback.networkError' };
            break;
          case 'notRSS':
            watchedState.uiState = { status: 'invalid', feedbackKey: 'feedback.notRSS' };
            break;
          default:
            console.log('got into default in switch');
        }
      });
  };

  const formSubmitData = { watchedState, request };
  form.addEventListener('submit', handlers.formSubmit(formSubmitData));
};
