import AbastractPage from "./AbastractPage.js";

export default class extends AbastractPage {
  constructor() {
    super();
    this.setTitle('FormProduct');
  }

  async getHtml() {
    const cadProduct = document.createElement('div');
    cadProduct.classList.add('container');

    const form = document.createElement('form');
    form.classList.add('row', 'g-3');
    form.action = '/api/product';
    form.method = 'POST';
    form.enctype = "multipart/form-data";

    let div = document.createElement('div');
    div.classList.add('col-md-6');

    let input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form-control');
    input.name = 'name';
    input.required = true;

    let label = document.createElement('label');
    label.classList.add('form-label');
    label.innerHTML = 'Product name: ';

    div.appendChild(label);
    div.appendChild(input);

    form.appendChild(div);

    div = document.createElement('div');
    div.classList.add('col-md-6');

    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form-control');
    input.name = 'description';
    input.required = true;

    label = document.createElement('label');
    label.classList.add('form-label');
    label.innerHTML = 'Description: ';

    div.appendChild(label);
    div.appendChild(input);

    form.appendChild(div);

    div = document.createElement('div');
    div.classList.add('col-md-6');

    input = document.createElement('input');
    input.id = 'image';//usaar para validar o camo antes do submit
    input.type = 'file';
    input.classList.add('form-control');
    input.name = 'image';
    input.accept = '.png, .jpg';
    input.required = true;

    label = document.createElement('label');
    label.classList.add('form-label');
    label.innerHTML = 'Product image(.jpg and .png): ';

    div.appendChild(label);
    div.appendChild(input);

    form.appendChild(div);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const response = await fetch('/api/products/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        document.cookie = "";
      } else {
        alert('Produto cadastrado com sucesso!');
        window.location.href = '/formProduct';
      }
    });

    const button = document.createElement('button');
    button.type = 'submit';
    button.classList.add('btn', 'btn-primary');
    button.innerHTML = `SEND`;

    form.appendChild(button);
    cadProduct.appendChild(form);

    return cadProduct;
  }
  // async getHtml() {
  //   const cadProduct = document.createElement('div');
  //   cadProduct.classList.add('form-product');

  //   const form = document.createElement('form');
  //   form.action = '/api/product';
  //   form.method = 'POST';
  //   form.enctype = "multipart/form-data";

  //   let div = document.createElement('div');
  //   div.classList.add('user-box');

  //   let input = document.createElement('input');
  //   input.type = 'text';
  //   input.name = 'name'
  //   input.required = true;

  //   let label = document.createElement('label');
  //   label.innerHTML = 'Product name: ';

  //   div.appendChild(label);
  //   div.appendChild(input);

  //   form.appendChild(div);

  //   div = document.createElement('div');
  //   div.classList.add('user-box');

  //   input = document.createElement('input');
  //   input.type = 'text';
  //   input.name = 'description';
  //   input.required = true;

  //   label = document.createElement('label');
  //   label.innerHTML = 'Description: ';

  //   div.appendChild(label);
  //   div.appendChild(input);

  //   form.appendChild(div);

  //   div = document.createElement('div');
  //   div.classList.add('user-box');

  //   input = document.createElement('input');
  //   input.id = 'image';//usaar para validar o camo antes do submit
  //   input.type = 'file';
  //   input.name = 'image';
  //   input.accept = '.png, .jpg';
  //   input.required = true;

  //   label = document.createElement('label');
  //   label.innerHTML = 'Product image(.jpg and .png): ';

  //   div.appendChild(label);
  //   div.appendChild(input);

  //   form.appendChild(div);

  //   form.addEventListener('submit', async (event) => {
  //     event.preventDefault();

  //     const formData = new FormData(form);

  //     const response = await fetch('/api/products/', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (data.error) {
  //       alert(data.error);
  //       document.cookie = "";
  //     } else {
  //       alert('Produto cadastrado com sucesso!');
  //       window.location.href = '/formProduct';
  //     }
  //   });

  //   const button = document.createElement('button');
  //   button.type = 'submit';
  //   button.innerHTML = `SEND <span></span>`;

  //   form.appendChild(button);
  //   cadProduct.appendChild(form);

  //   return cadProduct;
  // }

}