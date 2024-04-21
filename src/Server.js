const express = require('express');
const { config } = require('dotenv');
const router = require('./routes');

class Server {
  constructor() {
    this.app = express();
  }

  #configEnvironment(){
    config();

    this.port = process.env.PORT ?? 3000;
    this.hostname = process.env.SERVER_HOSTNAME ?? "localhost";
  }

  start() {
    this.#configEnvironment();
    this.app.use(express.json());
    this.app.use('/api', router);
    this.app.listen(this.port, () => {
      console.log(`Server running on http://${this.hostname}:${this.port}`);
    });
  }
}

module.exports = Server;