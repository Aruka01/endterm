var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response)
{
    console.log('request ', request.url);

    var filePath = '.' + request.url;

    if (filePath == './') {
        filePath = './index.html';
    }

    if (filePath == './index') {
        filePath = './index.html';
    }

    if (filePath == './about') {
        filePath = './about.html';
    }

    if (filePath == './img/gallery/graduation') {
        filePath = './img/gallery/graduation.jpg';
    }

    if (filePath == './img/gallery/study') {
        filePath = './img/gallery/study.jpg';
    }

    if (filePath == './video/students/memes') {
        filePath = './video/students/memes.mp4';
    }

    var extname = String(path.extname(filePath)).toLowerCase();

    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content)
    {
        if (error) {
            if(error.code == 'ENOENT')
            {
                fs.readFile('./error.html', function(error, content)
                {
                    response.writeHead(500,
                        { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, error code: : '+ error.code +' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000);

console.log("The server is running on localhost:3000. Press CTRL+C to terminate...")