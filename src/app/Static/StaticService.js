const path = require('path');

const compressImage = require('../../utils/compressImage');
const multer = require('multer');
const multerConfig = require('../../../config/multer');
const upload = multer(multerConfig).single('file');

class StaticService {
  constructor({
    Sequelize,
    Error,
  }) {
    this.sequelize = Sequelize;
    this.Error = Error;

    this.fileDir = path.join(__dirname, '..', '..', 'static');
  }

  createFile(req, res, next) {
    upload(req, res, (err) => {
      try {
        if (err) throw new this.Error(err.message, 400);

        compressImage({
          file: req.file,
        },
        (err, file) => {
          if (err) {
            return res.status(400).json({ message: 'error' });
          }

          const { originalname: name, size, filename, mimetype, url = '' } = file;
          const returnedFile = {
            name,
            size,
            filename,
            mimetype,
            url,
          };

          return res.status(201).json({ message: 'ok', file: returnedFile });
        });
      } catch(err) {
        console.log(err);
        next(err);
      }
    });
  }

}

module.exports = StaticService;
