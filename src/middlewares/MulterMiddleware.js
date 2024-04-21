const multer = require('multer');
const Crypto = require('crypto');


class MulterMiddleware {
  constructor(){
    this.storage = multer.diskStorage({
      destination : this.destination.bind(this),
      filename: this.filename.bind(this),
    });

    this.upload = multer({storage : this.storage });
  }

  destination(req, res, cb){
    cb(null, 'src/public/uploads');
  }

  filename(req, file, cb) {
    const ext = file.originalname.split('.')[1];
    const newName = Crypto.randomBytes(16).toString('hex') + '-' + Date.now();

    cb(null, `${newName}.${ext}`);
  }
}

const upload = new MulterMiddleware().upload;

module.exports = upload;