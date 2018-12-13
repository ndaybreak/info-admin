

const express = require('express');
 const http = require('http'); 
 const app = express() 
 var router = express.Router(); //配置路由 这样访问localhost:3000/select就能访问的接口了 

 app.use('/select', require('./select')) 
 app.use(router); 

 app.listen(80);
