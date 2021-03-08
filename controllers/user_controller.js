const User=require('../models/user');
module.exports.profile= function(req,res){
    return res.render('user_profile',{title:"profile"});
}
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',
    {title:"Codeial|Signup"});
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',
    {title:"Codeial|SignIn"});
}
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log("Error in finding from DB")};

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log("Error in creating user")};

                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}
module.exports.createSession=function(req,res){
    //To do
}