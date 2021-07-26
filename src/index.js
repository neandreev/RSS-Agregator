import 'bootstrap/dist/css/bootstrap.min.css';

const init = () => {
  const container = document.querySelector('#point');
  const form = document.createElement('form');
  form.innerHTML = `
    <div class='container-sm'>
      <div class="row">
        <div class="col-8">
          <input type='href' class='form-control' id='rssHref'>
        </div>
        <div class="col-4">
          <button type='submit' class='btn btn-primary'>Add RSS</button>
        </div>
      </div>
    </div>
  `
  container.appendChild(form);
};

init();
