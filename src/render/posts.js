import i18next from 'i18next';

const renderPost = ({ link, title, isRead }) => (
  `<li>
    <div>
      <a class="${isRead ? 'fw-normal' : 'fw-bold'}" href="${link}">${title}</a>
      <button data-bs-toggle="modal" data-bs-target="#modal">
        ${i18next.t('buttons.post.preview')}
      </button>
    </div>
  </li>`
);

export default (posts) => {
  const result = `
    <div>
      <h2>${i18next.t('postsHeader')}</h2>
      <ul>
        ${posts.map(renderPost).join('')}
      </ul>
    </div>`;
  return result;
};
