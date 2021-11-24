const express = require('express');
const app = express();
const path = require('path');

const PORT = 5000;

const getPrimes = require('./getPrimes.js');



app.get('/api/v1/primenumber/:inputNumber', (req, res) => {
    const {inputNumber} = req.params
    if(isNaN(Number(inputNumber)) || Number(inputNumber) < 3){
        res.status(404).json({
            status: 404,
            error: {
                message: "Please input a number greater than 2"
            },
            ok: false
        })
    } else {
    const primeNumbers = getPrimes(Number(inputNumber))
    const resObject = {
        status: 200,
        nums: primeNumbers,
        ok: true
    }
    res.status(200).json(resObject)
    }   
});


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, ()=> {
    console.log(`server is listening at port ${PORT}`);
});