(function() {

    log = module.exports = console.log.bind(console);
    warn = module.exports = console.warn.bind(console);
    error = module.exports = console.error.bind(console);
    express = module.exports = require("express");

    app = module.exports = require('express')();
    http = module.exports = require('http').createServer(app);
    //http = module.exports = require('http2').createServer(app);
    //spdy = module.exports =  require('spdy').createServer(app);

    io = module.exports = require('socket.io')(http);
    //redisAdapter = module.exports = require('socket.io-redis');
    // REdis Adpater
    //io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
    request = module.exports = require('request');
    bodyParser = module.exports = require('body-parser');
    cors = module.exports = require('cors');
    path = module.exports = require('path');
    qs = module.exports = require('querystring');
    async = module.exports = require('async');
    bcrypt = module.exports = require('bcryptjs');
    // colors = module.exports = require('colors');
    logger = module.exports = require('morgan');
    jwt = module.exports = require('jwt-simple');
    moment = module.exports = require('moment');
    mongoose = module.exports = require('mongoose');
    //jwt  = module.exports =  require('jsonwebtoken');
    os = module.exports = require('os');
    ip = module.exports = require("ip");

    session = module.exports = require('express-session');
    Uppy = module.exports = require('@uppy/core');
    cors = module.exports = require('cors')
    fs = module.exports = require('fs');

    url = module.exports = require('url');
    // web3
    Web3 = module.exports = require('web3');
    web3 = new Web3("http://localhost:8545")

})();