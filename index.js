const express=require('express');
const port=8000;
const app=express();

app.use('/',require('./routes/index'));
app.listen(port,function(err){
    if(err){
        console.log(`Error in creating the server: ${err}`);
        return;
    }
    console.log(`Server up and running on port: ${port}`);
});