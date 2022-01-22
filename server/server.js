var currencyLocal = require('./localCurrency');
console.log(currencyLocal)
const express = require('express');
const app = express();

app.use(express.json())
const API_KEY ="8524c2afc528e64d63ff837bb96133d4"

//getting the exchange rate and output the result
const getExchangeRates = (exchangeCurrencyData,from,to) =>{
let currentCurrencyChange = exchangeCurrencyData.rates[to] / exchangeCurrencyData.rates[from];
return currentCurrencyChange;
}

//post request to change data in api fetch request
app.post('/currencyChange',async (req, res) =>
{
    let from=req.body.fromCurrency; //gets fromCurrency from request body (sending from fronted)
    let to = req.body.toCurrency;
    console.log(await checkDataFromApi(from,to))
    if(checkDataFromApi(from,to))
    {
        console.log("OK")
    const fetch = await require('node-fetch');
    const api_url = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&format=1?base=&symbols=${to},${from}`;
    const fetch_response = await fetch(api_url);
    const data= await fetch_response.json();
    let currentCurrencyChange= getExchangeRates(data,from,to); // holding the result from convertion
    res.status(200).send({'Response': currentCurrencyChange}) // sending it back as object for json response
    }
    else console.log("NOT OK")
})
app.get('/currency', async (req, res) => {
   //gets all the rates from api and store them 
    const fetch = await require('node-fetch');
    const api_url = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&format=1`
    const fetch_response = await fetch(api_url);
    const data= await fetch_response.json();
    res.json(data);
    console.log("data", data)
})
app.get('/currencyLocal', async (req, res) => {
res.send(currencyLocal);
})


// const checkDataFromApi = async(from,to) =>{
// const fetch = await require('node-fetch');
// const api_url = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&format=1`
// const fetch_response = await fetch(api_url);
// const data= await fetch_response.json();
// let count=0;
// for (const rate in data.rates){
//     if(from == rate)
//     console.log(rate)
//     console.log(from)
//     count++;
//     if(to == rate)
//     console.log(rate)
//     console.log(to)
//     count++;
//     if(count==2)
//     return true;
 
// }
// return false;
// }
app.listen(5000, ()=> {console.log("listening on port 5000")})
