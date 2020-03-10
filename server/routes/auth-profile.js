(function() {


    app.post("/post/validate/token", ensureAuthenticated, function(req, resp) {
        resp.send({ message: 'Token Are Valid', status: true, isTokenValid: true });
    });



       app.post("/post/profile/signup", function(req, resp) {
        log("/user/signup");
        log("Profile To Be Signed Up :");

        var profile = req.query.profile || req.body.profile || req.param["profile"];
        profile = JSON.parse(profile);
        log(profile);

        // perform database search 
        UserProfileModel.findOne({
            'email': profile.email
        }, function(err, found) {

            log("Resuts From Searching For Profile");
            log(found);

            if (err) {
                resp.send({ error: err, message: 'Some Error Occured', status: false });
            }

            if (found) {
                log('User Exist');
                log(found);
                resp.send({ message: 'Profile Already Exist', status: true, isProfileExist: true });

            } else {

                log("User Does Not Exist. Creating A New Profile");
                var tuple = new UserProfileModel({
                    display_name: profile.display_name,
                    email: profile.email,
                    fullName: profile.fullName || profile.fullname,
                    password: profile.password,
                });

               

                tuple.save(function(errSaved, saved) {

                    log("Saved New Profile Data");
                    log(saved);

                    if (errSaved) {
                        log(errSaved);
                        resp.send({ error: errSaved, message: 'Not Able To Save. Error Occured', status: false });
                    }

                    log("Updating Profile ID Now with _ID");
                    log(saved._id);
                    resp.send({ message: 'Created New User. Login To Continue', status: true, isProfileExist: false, profile: saved });

                });

            }

        });
    });


    app.post("/post/profile/auth", function(req, resp) {
        log("/post/user/auth");
        var email = req.query.email || req.body.email || req.param["email"];
        var password = req.query.password || req.body.password || req.param["password"];

        // perform database search 
        UserProfileModel.findOne({
            'email': email
        }, function(err, found) {
            if (err) {
                resp.send({ error: err, message: 'Some Error Occured', status: false });
            }

            log("Result For Auth Via Email :");
            if (found) {

                if (found.password) {

                    log("Comparing User If Logged In Using Email/Password");
                    found.comparePassword(password, function(passErr, isMatch) {

                        if (passErr) {
                            resp.send({ error: err, message: 'Some Error Occured Comparing Password', status: false });
                        }

                        if (isMatch) {
                            log("Password Match");
                            log(found);
                            var token = createJWT(found);
                            resp.send({ message: "Welcome Back " + found.display_name, isNewUser: false, isPasswordCorrect: true, status: true, token: token, profile: found, isAuth: true });

                        } else {
                            log("Password Did Not Match");
                            resp.send({ message: "Password Incorect", isNewUser: false, isPasswordCorrect: false, status: true, isAuth: false });
                        }

                    });

                } else {
                    log('Account Is Created Using FB. Kindly Login using FB');
                    resp.send({ message: 'Account Is Created Using FB. Kindly Login using FB', status: true, isAuth: false });

                }
            } else {
                log('User Does Not Exist');
                resp.send({ message: 'Account Does Not Exist.Sign-Up', status: true, isAuth: false });
            }

        });
    });



})()