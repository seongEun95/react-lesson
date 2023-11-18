const fs = require('fs');
const path = require('path');

const errorrHandler = err => err && console.log(err);

const rootPath = path.join(__dirname, 'root');
const folderList = ['/A', '/B'];

function makeFileStructure() {
  fs.mkdirSync(rootPath);

  // 폴더생성
  folderList.forEach(folderPath => {
    const isExist = fs.existsSync(rootPath + folderPath, errorrHandler);
    if (!isExist) fs.mkdirSync(rootPath + folderPath);
  });

  // 파일생성
  fs.writeFile(rootPath + '/A/a-1.txt', 'this is file a-1.txt', errorrHandler);

  new Array(5).fill(null).forEach((_, i) => {
    fs.writeFile(
      rootPath + `/B/b-${i + 1}.txt`,
      `this is file b-${i + 1}.txt`,
      errorrHandler,
    );
  });

  new Array(2).fill(null).forEach((_, i) => {
    fs.writeFile(
      rootPath + `/r-${i + 1}.txt`,
      `this is file r-${i + 1}.txt`,
      errorrHandler,
    );
  });
}

module.exports = makeFileStructure;
