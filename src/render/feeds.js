import i18next from 'i18next';

const renderFeed = ({ title, description }) => (
  `<li>
    <h3>${title}</h3>
    <p>${description}</p>
  </li>`
);

export default (feeds) => {
  const result = `
    <div>
      <h2>${i18next.t('feedsHeader')}</h2>
      <ul>
        ${feeds.map(renderFeed).join('')}
      </ul>
    </div>
  `;
  return result;
};
