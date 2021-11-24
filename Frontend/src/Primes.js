import React, { useState } from "react";
import './App.css';

const Primes = () => {

    const [inputNumber, setInputNumber] = useState("");
    const [primeNumbers, setPrimeNumbers] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setInputNumber(e.target.value);
        console.log(inputNumber);
    }

    const url = `/api/v1/primenumber/${inputNumber}`

    const getPrimeNumbers = (url) => {
        setIsPending(true);
        fetch(url)
        .then(res => {
          if(!res.ok){
           throw Error('Please input a number greater than 2');
          }
         return res.json();
        })
        .then(data => {
         setIsPending(false);
         setPrimeNumbers(data.nums);
         console.log(data.nums);
        })
        .catch(err => {
          console.log(`Error: ${err.message}`);
          setError(err.message)
        }); 
    }


    return (
      <>
      <div className="prime">
          <h1>Prime Number API</h1>
          {error && <h2 className="error-message">{error}</h2> }
          <div>
            <label className="label" htmlFor="input">Input a number:</label><br></br>
            <input 
              type="number"
              id="inputNumber" 
              name="inputNumber" 
              onChange={e => handleInputChange(e)}
              required /> <br></br>
            <button onClick={() => getPrimeNumbers(url)}>Submit</button>
          </div>
            {isPending && <div>Please Wait...</div>}
          <div className="result">{primeNumbers.map(primeNumber => <p key={primeNumber}>{primeNumber}</p>)}</div>
      </div>
      </>
  )
}

export default Primes;
