import AbastractPage from "./AbastractPage.js";

export default class extends AbastractPage {
  constructor() {
    super();
    this.setTitle('ClientPage');
  }

  async getHtml() {
    const productTable = document.createElement('div');
    productTable.classList.add('container');

    const table = document.createElement('table');
    table.classList.add('table');

    // Cabeçalho da tabela
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
      </tr>
    `;
    table.appendChild(tableHeader);

    // Corpo da tabela
    const tableBody = document.createElement('tbody');

    // Dados fictícios de produtos (substitua por seus próprios dados do banco de dados)
    const products = await fetch('/api/products')
      .then(res => res.json())
      .then(res => res['data'])
      .catch(error => {
        console.error('Va descobrir o que deu errado', error);
      });


    // Loop pelos produtos e cria uma linha na tabela para cada um
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="/uploads/${product.imgName}" alt="${product.name}" style="max-width: 100px;"></td>
        <td>${product.name}</td>
        <td>${product.description}</td>
      `;
      tableBody.appendChild(row);
    });

    const sse = new EventSource('/api/products/products-update');
    sse.addEventListener('new-product', e => {
      const newRow = document.createElement('tr');
      const response =JSON.parse(e.data);

      newRow.innerHTML = `
        <td><img src="/uploads/${response.imgName}" alt="${response.name}" style="max-width: 100px;"></td>
        <td>${response.name}</td>
        <td>${response.description}</td>
        `
      tableBody.appendChild(newRow);
    });

    table.appendChild(tableBody);

    productTable.appendChild(table);

    return productTable;
  }
}