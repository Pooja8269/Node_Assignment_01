const express = require('express');
const app = express();
app.use(express.json());
const log = require('./middlewares/log');
const morgan = require('morgan');
const BaseJoi = require('joi');
app.use(express.urlencoded({extended:true})); 
app.use(express.static('public'));
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const router = require('./Routing/routing');


app.use(morgan('tiny'));
app.use(log);

app.use('/', router); 



let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listen on port  ${port}`));
