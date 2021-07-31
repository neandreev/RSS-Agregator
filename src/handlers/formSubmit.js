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
      document.querySelector('form').reset();

      request(id, url);
    })
    .catch(({ message }) => {
      watchedState.uiState = {
        status: 'invalid',
        feedbackKey: message.key,
      };
    });
};
