export default () => {
  const doc = `
    <div class="container-sm">
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
              <a role="button" class="btn btn-primary">
              </a>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="form">
        <form class="md-3">
          <div class='container-sm'>
            <div class="row">
              <div class="col-8">
                <input name='url' type='href' class='form-control' id='rssHref'>
              </div>
              <div class="col-4">
                <button type='submit' class='btn btn-primary'>Add RSS</button>
              </div>
            </div>
          </div>
        </form>
        <p class='feedback small'></p>
      </div>
      <div id="posts_feeds">
        <div id="feeds"></div>
        <div id="posts"></div>
      </div>
    </div>
  `;

  return doc;
};
