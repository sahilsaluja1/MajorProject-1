const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
const layouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const MongoStore=require('connect-mongo')(session);
const sass=require('node-sass-middleware');
const nodeSassMiddleware = require('node-sass-middleware');

app.use(nodeSassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    output:'extended',
    prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(layouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticationUser);
app.use('/',require('./routes/index'));
app.listen(port,function(err){
    if(err){
        console.log(`Error in creating the server: ${err}`);
        return;
    }
    console.log(`Server up and running on port: ${port}`);
});

