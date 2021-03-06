import i18next from 'i18next';

export default () => {
  const placeholder = `${`${i18next.t('inputPlaceholder')}:&nbsp;https://waitbutwhy.com/feed`}`;
  const doc = `
    <div class="container-fluid">
      <div class="row">
        <div class="mx-auto my-2 col-12 col-sm-10 col-lg-8 col-xl-6">
          <div id="modal" class="modal fade" aria-hidden="true" tabindex="1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title"></h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p></p>
                </div>
                <div class="modal-footer">
                  <div class="btn-group">
                    <a role="button" class="btn btn-primary">
                    </a>
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-2">
            <h1>${i18next.t('applicationName')}</h1>
          </div>  
          <div id="form">
            <div class="bg-light border border-1 rounded mt-1 py-2 px-3">
              <label class="form-label" for="rssHref">${i18next.t('inputLabel')}</label>
              <form>
                <div class="row">
                  <div class="col">
                    <input placeholder=${placeholder} aria-label="url" name="url" type="href" class="form-control" id="rssHref">
                  </div>
                  <div class="col-auto">
                    <button aria-label="add" type="submit" class="btn btn-primary">${i18next.t('buttons.form.add')}</button>
                  </div>
                </div>
              </form>
              <small class="feedback small"></small>
            </div>
          </div>
          <div id="posts_feeds">
            <div id="feeds"></div>
            <div id="posts"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  return doc;
};
