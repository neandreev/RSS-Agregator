import i18next from 'i18next';
import _ from 'lodash';

const renderFeed = ({ title, description }) => (
  `<li class="list-group-item bg-light">
    <h3>${title}</h3>
    <p>${description}</p>
  </li>`
);

export default (feeds) => {
  const sortedFeeds = _.sortBy(feeds, ['id']).reverse();
  const result = `
    <div>
      <h2>${i18next.t('feedsHeader')}</h2>
      <ul class="list-group list-group-flush">
        ${sortedFeeds.map(renderFeed).join('')}
      </ul>
    </div>
  `;
  return result;
};
