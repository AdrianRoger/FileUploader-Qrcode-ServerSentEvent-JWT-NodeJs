import AbastractPage from "./AbastractPage.js";

export default class extends AbastractPage {
  constructor() {
    super();
    this.setTitle('Login 2');
  }

  async getHtml() {
    const teste = document.createElement('div');
    teste.classList.add('login-box');
    teste.innerHTML = 'Parabéns, você está logado!';
    teste.style.color = "white";

    const exit = document.createElement('button');
    exit.innerText = 'sair';

    exit.onclick = async function () {
      const response = await fetch('/api/login/exit', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const resp = await response.json();
      alert(resp.message);
      window.location.href = '/';
    }

    teste.appendChild(exit);

    return teste;
  }

}