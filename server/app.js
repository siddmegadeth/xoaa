(function() {
    "use strict";
    var cluster = require('cluster');
    require("./init/index"); //Init Modules
    require("./models/index"); //Init Databases Models
    require("./routes/index"); //Init Ai=uth Route


    if (cluster.isMaster) {
        var numWorkers = require('os').cpus().length;

        console.log('Master cluster setting up ' + numWorkers + ' workers...');
        // numWorkers
        for (var i = 0; i < 4; i++) {
            cluster.fork();
        }

        cluster.on('online', function(worker) {
            console.log('Worker ' + worker.process.pid + ' is online');
        });

        cluster.on('exit', function(worker, code, signal) {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });
    } else {
        http.listen(app.get("PORT"), function(req, resp) {
            log("Xoaa Project Server Started " + app.get("PORT"));
            log("Face API Module Loaded :");
            log("Multer Local Disk Path :");
            log(path.join(__dirname, "uploads"));


        });

    }




})()