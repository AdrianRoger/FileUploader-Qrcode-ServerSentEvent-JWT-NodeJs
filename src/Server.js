const express = require('express');
const { config } = require('dotenv');
const path = require('path');
const router = require('./routes');
const cookieParser = require('cookie-parser');

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
    this.app.use(cookieParser());

    //Router api
    this.app.use('/api', router);
    
    //middleware to server static files
    this.app.use(express.static(path.join(__dirname, 'public')));

    //admin static file
    this.app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    //listen 
    this.app.listen(this.port, () => {
      console.log(`Server running on http://${this.hostname}:${this.port}`);
    });
  }
}

module.exports = Server;