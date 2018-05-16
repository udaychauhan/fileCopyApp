const readline = require('readline');
const fileLib = require('./fileLib.js');

const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//-- keeping them global
let sourceDir = '';
let fileToCopy = '';

//exit handler to be used in cases of error or program completion
let exitHandler = () => {

    readLine.question('Do you want to Exit.(Y/N) ', (answer) => {
        if (answer.toLowerCase() == 'yes' || answer.toLowerCase() == 'y') {
            readLine.close();
        } else {
            readLineInterface();
        }
    });

}

// now take file name and dest name and copy it to dest
// if dest not there make it and then copy 
// if source and dest same it will still copy  exit or rerun, decide then
let copyInterface = () => {
    // in file lib you need to create a new dir if no dir is present
    //check if dir is present, if not then create it
    //if dir present then take that dir name and append file name and copy that's it.
    readLine.question('Enter destination to copy to. ', (destDir) =>{
        fileLib.writeToDirAsync(fileToCopy,sourceDir,destDir,(val)=>{
            if(val){
                console.log('File Copied to Directory.');
                exitHandler();
            }else{
                exitHandler();
            }
        });
           
        
    });
}

fileAndDestinationSelection = (files) => {
    let srcDirFiles = files;
    readLine.question('Select File (by position) to copy to new Destination. ', (answer) => {
        //-- checking if input is number or not, isNaN = is Not a Number
        if (!isNaN(answer)) {
            if (answer > srcDirFiles.length || answer < 1) {
                console.log('Invalid Input!');
                fileAndDestinationSelection(srcDirFiles);
            } else {
                let pos = answer-1;
                console.log('File Selected is : ' + srcDirFiles[pos]);
                fileToCopy = srcDirFiles[pos];
                copyInterface();
            }
        } else {
            console.log('Invalid Input!');
            fileAndDestinationSelection(srcDirFiles);
        }
    });
}

readLineInterface = () => {
    readLine.question('Enter name of the source directory. ', (answer) => {

        console.log(`The name is : ${answer}`);
        sourceDir = answer;
        fileLib.readDirAsync(answer, (err, files) => {
            if (err) {
                console.log(`Error Occured : ${err}`)
                console.log(`Please enter correct directory name.`);
                exitHandler(readLine);
            } else {
                console.log(`Files are: `);
                if(files.length<1){
                    console.log('Empty Directory!!');
                    exitHandler();
                }else{
                    for (i = 0; i < files.length; i++) {
                        console.log(`${i + 1} ${files[i]} \n`);
                    }
                    fileAndDestinationSelection(files);
                }
               
            }
        });
    });
}


readLineInterface();