import i18next from 'i18next';
import * as yup from 'yup';
import onChange from 'on-change';
import _ from 'lodash';
import axios from 'axios';
import handlers from './handlers';
import parse from './parse';
import render from './render';
import locales from './locales';

const isRSS = ({ data }) => (
  data.status.content_type.includes('application/rss+xml')
);

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

  const form = document.querySelector('form');
  const input = document.querySelector('.form-control');
  const button = document.querySelector('form button');
  const feedback = document.querySelector('.feedback');
  const feedsContainer = document.querySelector('#feeds');
  const postsContainer = document.querySelector('#posts');

  button.textContent = i18next.t('buttons.form.add');

  const watchedState = onChange(state, (path, value) => {
    if (path === 'uiState') {
      switch (value.status) {
        case 'pending':
          input.classList.remove('is-invalid');
          feedback.textContent = '';
          break;
        case 'invalid':
          input.classList.add('is-invalid');
          feedback.classList.add('text-danger');
          feedback.classList.remove('text-success');
          feedback.textContent = i18next.t(value.feedbackKey);
          break;
        case 'complete':
          input.classList.remove('is-invalid');
          feedback.classList.remove('text-danger');
          feedback.classList.add('text-success');
          feedback.textContent = i18next.t(value.feedbackKey);
          break;
        case 'networkError':
          input.classList.add('is-invalid');
          feedback.classList.add('text-danger');
          feedback.classList.remove('text-success');
          feedback.textContent = i18next.t(value.feedbackKey);
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
      return;
    }

    if (path.includes('posts')) {
      console.log(value);
    }

    console.log(state);
  });

  const request = (id, url) => {
    axios
      .get(getAllOriginsUrl(url))
      .then((response) => {
        if (!isRSS(response)) {
          watchedState.uiState = {
            status: 'invalid',
            feedbackKey: 'feedback.notRSS',
          };
          return;
        }

        const makeRequest = () => {
          const parsedChannel = parse(response.data);
          const { items, title, description } = parsedChannel;
          const feed = {
            id, url, title, description,
          };
          const posts = items
            .map((item) => ({ ...item, feedId: id }));
          console.log(posts);
          const newPosts = _.differenceBy(posts, state.posts, 'link');
          console.log(newPosts);

          watchedState.feeds = _.sortBy(_.uniqBy([
            feed,
            ...state.feeds,
          ], 'url'), 'id');
          watchedState.posts = _.uniqBy([
            ...newPosts,
            ...state.posts,
          ], 'link');

          setTimeout(makeRequest, 5000);

          console.log('tick');
        };

        makeRequest();
        watchedState.uiState = { status: 'complete', feedbackKey: 'feedback.complete' };
      })
      .catch(() => {
        watchedState.uiState = { status: 'networkError', feedbackKey: 'feedback.networkError' };
      });
  };

  const formSubmitData = { watchedState, request };
  form.addEventListener('submit', handlers.formSubmit(formSubmitData));
};
