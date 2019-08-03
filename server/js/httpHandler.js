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
  var randomCommand = req.method === 'GET' ? validMessages[Math.floor(Math.random() * (validMessages.length - 1))] : '';



  // for (var i = 0; i < randomCommand.length; i++) {
  //   randomCommandData.push(randomCommand.charCodeAt(i));
  // }

  // console.log(randomCommand);
  //parsed the req.url to get identifier for info it wants to 'get'
  // req.url => 'identifier'
  // console.log(req.url);

  // if (req.url.includes('messages')) {
  //   if (req.method === 'GET') {

  //   }
  // }
  // res.write(randomCommand);
  //console.log(typeof randomCommand);
  res.writeHead(200, headers);
  res.end(randomCommand);
  next(); // invoke next() at the end of a request to help with testing!
};
