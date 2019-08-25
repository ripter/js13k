const fs = require('fs');
const archiver = require('archiver');

// Remove the temp files created by the build
fs.unlinkSync('./dist/main.js');
// fs.unlinkSync('./dist/main.css');

let output = fs.createWriteStream('./dist/build.zip');
let archive = archiver('zip', {
    zlib: { level: 9 } // set compression to best
});

const MAX = 13 * 1024; // 13kb

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function () {
    const bytes = archive.pointer();
    const percent = (bytes / MAX * 100).toFixed(2);
    if (bytes > MAX) {
        console.error(`Size overflow: ${bytes} bytes (${percent}%)`);
    } else {
        console.log(`Size: ${bytes} bytes (${percent}%)`);
    }
});

archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        console.warn(err)
    } else {
        throw err
    }
});

archive.on('error', function (err) {
    throw err
});

// pipe archive data to the file
archive.pipe(output);
archive.append(
  fs.createReadStream('./dist/index.html'), {
    name: 'index.html'
  },
);
// archive.append(
//   fs.createReadStream('./dist/loopTwo.mp3'), {
//     name: 'loopTwo.mp3'
//   }
// );

archive.finalize();
