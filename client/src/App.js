import React,{useEffect,useState} from 'react'
import Currency from './Currency'
import './App.css';
import { HiSwitchHorizontal } from 'react-icons/hi';

function App(){ 
   const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  const [arrayFrom2Data,setArrayFrom2Data] = useState([]);
console.log("array from data", setArrayFrom2Data)
 let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(()=>{ 
    //gets all rates data to implement currency
     fetch("/currency").then(
      response => response.json()
    ).then(
      data => {const firstCurrency = Object.keys(data.rates)[20]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
        setArrayFrom2Data(Object.keys(data.rates));
      })
    
  },[]);
  useEffect(() => {
    //fetch the change rates when user make onChange event
  const fetchCurrency =async ()=>{
      if (fromCurrency != null && toCurrency != null) {
     const res=await fetch("/currencyChange",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "fromCurrency":fromCurrency,
          "toCurrency":toCurrency,
          
        })
      })
      //getting the response from the server which we calculate by rate
      let jsonRes=await res.json();
      console.log("my rates", jsonRes);
      setExchangeRate(jsonRes.Response)
    }
}
fetchCurrency();
console.log("again and again")
  }, [fromCurrency, toCurrency])

  useEffect(async() => {
    let res = await fetch("/currencyLocal")
    let options = await res.json();
    setArrayFrom2Data(...Object.keys(options.rates))
    
  },[])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
function flip() {
    var temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  return(
<>
     <div className="App">
      <div className="heading">
     <h1>Currency Calculator</h1>
     </div>

     <h3>Currency I Have</h3>
      <Currency
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="switch">
          <HiSwitchHorizontal size="30px" 
                        onClick={() => { flip()}}/>
        </div>
      <div className="equals">=</div>
      <h3>Currency I Want</h3>
      <Currency
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
     </div>
     
    </>
   
  

    
  )
}

export default App;