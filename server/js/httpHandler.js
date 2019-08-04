const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const validMessages = require('./keypressHandler').validMessages;

const multipart = require('./multipartUtils');

const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  var command = '';
  if (req.method === 'GET' ){
    if (req.url.includes('messages')) {
      if (req.url.includes('random')) {
        command = validMessages[Math.floor(Math.random() * validMessages.length)];
        res.writeHead(200, headers);
        res.end(command);
        next();
      }
      command = messages.dequeue();
      res.writeHead(200, headers);
      res.end(command);
      next();
    }
    if (req.url.includes('jpg')) {
      if (!req.url.includes(module.exports.backgroundImageFile)) {
        res.writeHead(404, headers);
        res.end();
        next();
      } else {
        if (req.url === '/background.jpg') {
          res.writeHead(200, headers);
          console.log(req.url);
          fs.readFile(module.exports.backgroundImageFile, (err, fileData) => {
            console.log(fileData);
            if (err) {
              console.log(err);
            } else {
              res.write(fileData);
            }
            res.end();
            next();
          });
        } else {
          res.writeHead(200, headers);
          fs.readFile(req.url, (err, fileData) => {
            res.end(fileData);
            next();
          });
        }
      }
    }
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }
  // invoke next() at the end of a request to help with testing!
};
