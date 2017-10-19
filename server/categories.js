const clone = require('clone')
const config = require('./config')
const express = require('express')
var fs = require('fs');

let db = {}

const BASE64 = 'data:image/png;base64,'

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap, 'binary').toString('base64');
}

const defaultData = {
  categories: [
      {
        name: 'Laravel',
        path: 'laravel',
        image: BASE64 + base64_encode('images/laravel.png'),
        icon: BASE64 + base64_encode('images/laravel_icon.png')
      },
      {
        name: 'Ember',
        path: 'ember',
        image: BASE64 + base64_encode('images/ember.png'),
        icon: BASE64 + base64_encode('images/ember_icon.png')
      },
      {
        name: 'React',
        path: 'react',
        image: BASE64 + base64_encode('images/react.png'),
        icon: BASE64 + base64_encode('images/react_icon.png')
      },
      {
        name: 'Angular',
        path: 'angular',
        image: BASE64 + base64_encode('images/angular.png'),
        icon: BASE64 + base64_encode('images/angular_icon.png')
      }
  ]
}

function getData (token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
