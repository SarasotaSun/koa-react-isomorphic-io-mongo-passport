'use strict';
import path from 'path';
let rootPath = path.normalize(__dirname + '../../../')

module.exports = {

    development :
    {
        db: 'mongodb://localhost/reactTransform',
        port: process.env.PORT || 3000,
        rootPath : rootPath,
        appPath : rootPath + 'app',
        distPath : rootPath + 'dist',
        secret : 'devSecret'
    },
    production :
    {
        db: 'mongodb://localhost/reactTransform',
        port: process.env.PORT || 3000,
        rootPath : rootPath,
        appPath : rootPath + 'app/',
        distPath : rootPath + 'dist/',
        secret : 'devSecret'
    }
}