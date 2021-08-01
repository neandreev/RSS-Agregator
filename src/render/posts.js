import i18next from 'i18next';

const renderPost = ({
  link, title, isRead, id,
}) => (
  `<li class="list-group-item border-0">
    <div class="row">
      <div class="col-8">
        <a data-id="${id}" class="${isRead ? 'fw-normal' : 'fw-bold'}" href="${link}">${title}</a>
      </div>
      <div class="col-4">
        <button data-id="${id}"data-bs-toggle="modal" class="btn btn-secondary" data-bs-target="#modal">
          ${i18next.t('buttons.post.preview')}
        </button>
      </div>
    </div>
  </li>`
);

export default (posts) => {
  const result = `
    <div>
      <h2 class="list-group">${i18next.t('postsHeader')}</h2>
      <ul>
        ${posts.map(renderPost).join('')}
      </ul>
    </div>`;
  return result;
};
