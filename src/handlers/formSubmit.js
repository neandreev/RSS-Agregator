import _ from 'lodash';
import validateSchema from '../validateSchema';

export default (data) => (e) => {
  e.preventDefault();

  const {
    watchedState, request,
  } = data;

  const url = new FormData(e.target).get('url');
  validateSchema(watchedState)
    .validate(url)
    .then(() => {
      watchedState.uiState = {
        status: 'pending',
        feedback: '',
      };
      const id = _.uniqueId();

      request(id, url, true);
    })
    .catch((e) => {
      console.dir(e);
      watchedState.uiState = {
        status: 'invalid',
        feedbackKey: e.message.key,
      };
    });
};
