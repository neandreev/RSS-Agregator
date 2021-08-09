import _ from 'lodash';
import axios from 'axios';
import parse from '../parse';
import validateSchema from '../validateSchema';

const getAllOriginsUrl = (url) => (
  `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`
);

export default (watchedState) => (e) => {
  const state = watchedState;
  e.preventDefault();

  const errorSwitch = ({ message }) => {
    switch (message) {
      case 'Network Error':
        state.uiState = { status: 'networkError', feedbackKey: 'feedback.networkError' };
        break;
      case 'notRSS':
        state.uiState = { status: 'invalid', feedbackKey: 'feedback.notRSS' };
        break;
      default:
        throw new Error(`Unknown error message: ${e}`);
    }
  };

  const request = (id, url, makeStatus) => {
    const responseParser = ({ data }) => {
      const parsedChannel = parse(data);
      const { items, title, description } = parsedChannel;
      const newFeed = {
        id, url, title, description,
      };
      const posts = items
        .map((item) => ({ ...item, feedId: id, id: _.uniqueId() }));
      const newPosts = _.differenceBy(posts, state.posts, 'link');

      state.feeds = _.uniqBy([newFeed, ...state.feeds], 'url');
      state.posts = _.uniqBy([...newPosts, ...state.posts], 'link');

      if (makeStatus) state.uiState = { status: 'complete', feedbackKey: 'feedback.complete' };
      setTimeout(() => request(id, url), 5000);
    };

    axios
      .get(getAllOriginsUrl(url))
      .then(responseParser)
      .catch(errorSwitch);
  };

  const url = new FormData(e.target).get('url');

  const validation = {
    valid: () => {
      state.uiState = {
        status: 'pending',
        feedback: '',
      };
      const id = parseInt(_.uniqueId(), 10);

      request(id, url, true);
    },
    invalid: (error) => {
      state.uiState = {
        status: 'invalid',
        feedbackKey: error.message.key,
      };
    },
  };

  validateSchema(state)
    .validate(url)
    .then(validation.valid)
    .catch(validation.invalid);
};
