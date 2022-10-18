const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, '..', 'src', 'static'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => (cb(null, path.resolve(__dirname, '..', 'src', 'static'))),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        const baseUrl = '/static';
        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        file.url = encodeURI(`${baseUrl}/${fileName}`);
        cb(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimetypes = [
      'image/jpeg',
      'image/png',
      'image/pjpeg',
      'image/gif'
    ];

    if (allowedMimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de arquivo inválido'));
    }
  },
}
