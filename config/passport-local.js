const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

// Authentication using Passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(username,password,done){
        // Finding if the user exists
        User.findOne({email:username},function(err,user){
            if(err){
                console.log(`Error in finding the user --> passport`);
                return done(err);
            }
            if(!user || user.password!=password){
                console.log(`Error in finding username password`);
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in deserializing");
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}
passport.setAuthenticationUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;