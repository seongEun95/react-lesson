const fs = require('fs');

function deleteFolder(path) {
  if (!fs.existsSync(path))
    return console.log('경로에 해당하는 폴더가 없습니다.');

  fs.rm(path, { recursive: true }, err => err && console.log(err));
}

module.exports = deleteFolder;
