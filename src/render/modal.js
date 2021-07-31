import i18next from 'i18next';

export default (post) => {
  const modal = `
  <div id="modal fade show" style="display: block;" class="modal" tabindex="1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${post.title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${post.description}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">
            ${i18next.t('buttons.modal.continue')}
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            ${i18next.t('buttons.modal.close')}
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  return modal;
};
