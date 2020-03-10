(function() {




    UserProfileSchema = module.exports = new mongoose.Schema({
        display_name: { type: String },
        email: { type: String, unique: true, index: true },
        password: {
            type: String
        },
        fullName: { type: String },
        code_secret: {
            type: Number
        },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        last_login: { type: Date, default: Date.now }


    });




    UserProfileSchema.pre("save", function(next) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });

    });



    //Pass Comparison Function
    UserProfileSchema.methods.comparePassword = function(password, cb) {
        log("Compare Password with HASHED pass");
        log(password);
        log("HASHED");
        log(this.password);
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return cb(err);

            log("Return Status:");
            log(isMatch);
            cb(null, isMatch);
        });
    };



    UserProfileSchema.pre('save', function(next) {

        log("#####################");
        log("Saving  New Document :");
        now = new Date();
        this.updated_at = now;
        if (!this.created_at) {
            this.created_at = now
        }
        log("Login Type :");
        log(this.login_type);
        if (this.login_type == 'email') {
            log("Saving _id To Profile");
            log("ID :" + this._id);
            var ID = this._id;
            this.profile = ID;
            log(" Profile :");
            log(this.profile);
        }


        next();
    });

    UserProfileSchema.pre('findOneAndUpdate', function(next) {
        now = new Date();
        this.updated_at = now;
        log(this.getUpdate());
        this.find({}, function(err, preResp) {

            log("Pre Response :");
            next();
        });
        // geocode locationlongitude
    });

    UserProfileSchema.pre('aggregate', function(next) {
        log("Aggregate :");
        log(next);
        next();
    });



    UserProfileModel = module.exports = mongoose.model('UserProfileModel', UserProfileSchema);






})()