import i18next from 'i18next';
import * as yup from 'yup';

export default (state) => yup.string().url().required()
  .test({
    name: 'isDuplicate',
    message: i18next.t('feedback.duplicateUrl'),
    test: (value) => {
      const urls = state.feeds.map(({ url }) => url);
      return !urls.includes(value);
    },
  });
