// Questao03.jsx

import React, { useState, useEffect } from 'react';

const Questao03 = () => {
  const [capitals, setCapitals] = useState([]);
  const [maxPopulationCapital, setMaxPopulationCapital] = useState(null);
  const [minPopulationCapital, setMinPopulationCapital] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/region/europe?fields=capital,population");
        const data = await response.json();

        // Find the capital with the maximum and minimum population
        if (data.length > 0) {
          const sortedData = data.sort((a, b) => b.population - a.population);
          const maxPopulation = sortedData[0];
          const minPopulation = sortedData[sortedData.length - 1];

          setMaxPopulationCapital(maxPopulation);
          setMinPopulationCapital(minPopulation);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Capitais com maior e menor população</h1>
      {maxPopulationCapital && minPopulationCapital ? (
        <div>
          <div>
            <h2>Capital com a maior população:</h2>
            <p>Capital: {maxPopulationCapital.capital[0]}</p>
            <p>População: {maxPopulationCapital.population}</p>
          </div>
          <div>
            <h2>Capital com a menor população:</h2>
            <p>Capital: {minPopulationCapital.capital[0]}</p>
            <p>População: {minPopulationCapital.population}</p>
          </div>
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default Questao03;



