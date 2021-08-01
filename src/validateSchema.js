import * as yup from 'yup';

export default (state) => yup.string().url().required()
  .test({
    name: 'isDuplicate',
    message: { key: 'feedback.duplicateUrl' },
    test: (value) => {
      const urls = state.feeds.map(({ url }) => url);
      return !urls.includes(value);
    },
  });
