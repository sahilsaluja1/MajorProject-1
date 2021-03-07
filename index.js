const express=require('express');
const port=8000;
const app=express();
const layouts=require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(layouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if(err){
        console.log(`Error in creating the server: ${err}`);
        return;
    }
    console.log(`Server up and running on port: ${port}`);
});