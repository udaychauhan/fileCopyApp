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

let writeToDirAsync = (fileName,srcName,dirName,cb) =>{
    let completeSrcFileLocation = srcName+'/'+fileName;
    //checking if directory exists
    //if not making a new one
    if(!fs.existsSync(dirName)){
        console.log("Directory doesn't. Making one");
        fs.mkdirSync(dirName);
    }
    let completeDirFileLocation = dirName+'/'+fileName;

    let readStream = fs.createReadStream(completeSrcFileLocation);
    let writeStream = fs.createWriteStream(completeDirFileLocation);
    readStream.on('data',(chunk)=>{
        console.log(chunk);
        writeStream.write(chunk);
        
    });
    readStream.on('end',()=>{
        console.log('file read successfully');
        writeStream.end();
        //sending true if file copied successfully
        cb(true);
    });
   
}

module.exports = {

    writeToDirAsync : writeToDirAsync,
    readDirAsync: readDirAsync
}