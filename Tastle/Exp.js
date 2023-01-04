const express = require('express');
const app  = express();
const bodyParser = require('body-parser');

function printHello()
{
    console.log("Hello!");
    return 0;
}