import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card"

export default function Countries () {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState (true);
  const [rangeValue, setRangeValue] = useState (40);
  const [selectedRadio, setSelectedRadio] = useState ('');
  const radio = ['Africa', 'America','Asia', 'Europe', 'Oceania'];
  

  //   HOOK
  //   Tu joues une fois, tu le rejoues uniquement que si la dedans il y a un evenement qui a changé
  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          "https://restcountries.com/v2/all"
        )
        .then((res) => {
          setData(res.data);
          setPlayOnce(false);
        });
    }
        //Triage croissants des pays par pop
  const sortedCountry = () => {
    const countryObj = Object.keys(data).map((i) => data[i]);
    const sortedArray = countryObj.sort((a,b) => {
      return b.population - a.population
    });
    sortedArray.length = rangeValue
    setSortedData(sortedArray)
  };
  sortedCountry();
}, [data, rangeValue, playOnce]);  //A chaque fois que un changement dans data tu rejoues la fonction
            //Si array vide la fonction ne se joue qu'une fois

  return (
      <div className="countries">
        <div className="sort-container">
          <input type="range"min="1" max="250" 
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)} />
          <ul>
            {radio.map((radio)=> {
            return(
              <li key={radio}>
                <input type="radio" value={radio} id={radio}
                checked={radio === selectedRadio} onChange={(e) =>setSelectedRadio(e.target.value)} />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
          </ul>
        </div>
        <div className="cancel">
          {selectedRadio && <h5 onClick={()=> setSelectedRadio("")} >Reset filter</h5>}
        </div>
          <ul className="countries-list">
              {sortedData
              .filter((country)=> country.region.includes(selectedRadio))
              .map((country) => (
                <Card country={country} key={country.name} />
              ))}
          </ul>
      </div>
  );
};
