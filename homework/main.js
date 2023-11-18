const fs = require('fs');
const path = require('path');
const deleteFolder = require('./deleteFolder');
const makeFileStructure = require('./makeFileStructure');

const errorrHandler = err => err && console.log(err);
const rootPath = path.join(__dirname, 'root');

const isExistRoot = fs.existsSync(rootPath, errorrHandler);
const isExistA = fs.existsSync(rootPath + '/A', errorrHandler);
const isExistB = fs.existsSync(rootPath + '/B', errorrHandler);

console.log('Root', isExistRoot, 'A', isExistA, 'B', isExistB);

// 파일구조 생성
if (!isExistRoot && !isExistA && !isExistB) {
  console.log('파일구조 생성');
  makeFileStructure();
}

const randumNumber = Math.floor(Math.random() * 5) + 1;
console.log('랜덤 숫자', randumNumber);

fs.rm(rootPath + `/B/b-${randumNumber}.txt`, errorrHandler);
console.log(`B/b-${randumNumber}.txt 파일 삭제`);

deleteFolder(rootPath + '/A');
console.log('A 폴더 삭제');
