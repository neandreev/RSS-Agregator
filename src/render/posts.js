import i18next from 'i18next';

const renderPost = ({
  link, title, isRead, id,
}) => (
  `<li class="list-group-item bg-light">
    <div class="d-flex justify-content-between">
      <div class="">
        <a data-id="${id}" class="${isRead ? 'fw-normal' : 'fw-bold'}" href="${link}">${title}</a>
      </div>
      <div class="">
        <button data-id="${id}"data-bs-toggle="modal" class="btn btn-outline-primary" data-bs-target="#modal">
          ${i18next.t('buttons.post.preview')}
        </button>
      </div>
    </div>
  </li>`
);

export default (posts) => {
  const result = `
    <div>
      <h2>${i18next.t('postsHeader')}</h2>
      <ul class="list-group list-group-flush">
        ${posts.sort(({ id }) => parseInt(id, 10)).map(renderPost).join('')}
      </ul>
    </div>`;
  return result;
};
