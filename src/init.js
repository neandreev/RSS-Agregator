import * as yup from 'yup';
import onChange from 'on-change';
import _ from 'lodash';
import url from 'url';
import axios from 'axios';
import parse from './parse';

export default () => {
  const container = document.querySelector('#point');
  container.innerHTML = `
    <form class="md-3">
      <div class='container-sm'>
        <div class="row">
          <div class="col-8">
            <input type='href' class='form-control' id='rssHref'>
          </div>
          <div class="col-4">
            <button type='submit' class='btn btn-primary'>Add RSS</button>
          </div>
        </div>
      </div>
    </form>
  `;

  const state = {
    feeds: [],
    posts: [],
  };

  const getAllOriginsUrl = (url) => (
    `https://hexlet-allorigins.herokuapp.com/get?url=${url}`
  );

  const validateSchema = yup.string().required().url().test({
    name: 'isDuplicate',
    test: (value) => {
      const urls = state.feeds.map(({ url }) => url);
      return !urls.includes(value);
    },
  });

  const watchedState = onChange(state, (path, value) => {
    console.log(state);
  });

  const form = document.querySelector('form');
  const input = document.querySelector('.form-control');

  console.log(form);
  const submitHandler = (e) => {
    e.preventDefault();
    
    const { value: url } = input;
    validateSchema
      .isValid(url)
      .then((valid) => {
        if (!valid) {
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
          const id = _.uniqueId();
          const feed = { id, url };
          form.reset();

          axios
            .get(getAllOriginsUrl(value))
            .then((response) => {
              const parsedChannel = parse(response.data);
              console.log(parsedChannel);
              const { title, description } = parsedChannel;
              const newFeed = { ...feed, title, description };
              state.feeds = [...state.feeds, newFeed];
              watchedState.posts = [
                ...state.posts,
                parsedChannel.items.map((item) => ({ ...item, feedId: id }))
              ];
            })
            .catch((e) => console.log(e));
        }
      });

    console.log(state);
  };
  form.addEventListener('submit', submitHandler);
};
