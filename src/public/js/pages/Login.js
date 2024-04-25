import AbastractPage from "./AbastractPage.js";

export default class extends AbastractPage {
  constructor() {
    super();
    this.setTitle('Login');
  }

  async getHtml() {
    const login = document.createElement('div');
    login.classList.add('login-box');

    const form = document.createElement('form');
    form.action = '/api/login';
    form.method = 'POST';

    let div = document.createElement('div');
    div.classList.add('user-box');

    let input = document.createElement('input');
    input.type = 'text';
    input.name = 'username'
    input.required = true;

    let label = document.createElement('label');
    label.innerHTML = 'Username';

    div.appendChild(input);
    div.appendChild(label);

    form.appendChild(div);

    div = document.createElement('div');
    div.classList.add('user-box');

    input = document.createElement('input');
    input.type = 'password';
    input.name = 'password';
    input.required = true;

    label = document.createElement('label');
    label.innerHTML = 'Password';

    div.appendChild(input);
    div.appendChild(label);

    form.appendChild(div);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = form.username.value;
      const password = form.password.value;
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        document.cookie = "";
      } else {
        window.location.href = '/client';
      }
    });

    const button = document.createElement('button');
    button.type = 'submit';
    // a.addEventListener('click', function (e) {
    //   e.preventDefault(); // Impede o comportamento padrão de redirecionamento do link
    //   const form = this.closest('form'); // Encontra o formulário mais próximo
    //   if (form) {
    //     form.submit(); // Envia o formulário
    //   }
    // });
    button.innerHTML = `SEND <span></span>`;

    form.appendChild(button);
    login.appendChild(form);

    return login;
  }

}