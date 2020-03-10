(function() {
    //App Config Token Holder and Sedret
    config = module.exports = {
      
        TOKEN_SECRET: process.env.TOKEN_SECRET || 'THEWORLDISAPLAYGROUND',
    };

    //         MONGO_URI: 'mongodb://admin:admin123@ds145346.mlab.com:45346/hookup-2019-dummy', //Running On Local Instance


    // JWT Common Function
    createJWT = module.exports = function(mobileNumber) {
        var payload = {
            sub: mobileNumber,
            iat: moment().unix(),
            exp: moment().add(14, 'seconds').unix()
        };
        return jwt.encode(payload, config.TOKEN_SECRET);
    }

    ensureAuthenticated = module.exports = function(req, res, next) {
        if (!req.header('Authorization')) {
            return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
        }
        var token = req.header('Authorization').split(' ')[1];

        var payload = null;
        try {
            payload = jwt.decode(token, config.TOKEN_SECRET);
        } catch (err) {
            return res.status(401).send({ message: err.message });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token has expired' });
        }
        req.user = payload.sub;
        next();
    }


})();




//mongodb://irover:irover@123@ds233452.mlab.com:33452/irover-cabs-2018-boooking