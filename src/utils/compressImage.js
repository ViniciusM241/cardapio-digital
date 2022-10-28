const sharp = require('sharp');
const fs = require('fs');

function compressImage ({ file, path, size=762 }, cb) {
  const newPath = path ? `${__dirname + path}/${file.filename}` : file.path;

  sharp(file.path)
    .resize(size)
    .toBuffer()
    .then(data => {
      fs.writeFileSync(newPath, data);
      file.size = Buffer.byteLength(data);
      cb && cb(null, file);
    })
    .catch(err => {
      cb && cb(null, file);
    });
}

module.exports = compressImage;
