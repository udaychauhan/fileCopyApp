const fs = require('fs');

let readDirAsync = (name, cb) => {
    let dirName = name;
    let dirContent = fs.readdir(dirName, (err, files) => {
        if (err) {
            cb(err,null);
        } else {
            cb(null,files);
        }

    });

}

module.exports = {

   // readFileAsynchronously: readFileAsynchronously,

    readDirAsync: readDirAsync
}