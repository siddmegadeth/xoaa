(function() {



    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    });



    app.set('host', process.env.NODE_IP || 'localhost');
    app.set("PORT", process.env.PORT || 8003);
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));
    app.use(cors());
    //    app.use(bodyParser.json());
    app.use("/web", express.static("public/xoaa-assignment/www"));
    app.use("/uploads", express.static("uploads"));

    app.use(bodyParser({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

    app.use(session({ secret: 'some secrety secret' }));

    //setup web3



})();