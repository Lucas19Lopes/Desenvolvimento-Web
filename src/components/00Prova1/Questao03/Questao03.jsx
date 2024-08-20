import React, { useState, useEffect } from 'react';

// Componente funcional Questao03
const Questao03 = () => {
  // Declaração dos estados para armazenar as capitais e as capitais com maior e menor população
  const [capitals, setCapitals] = useState([]);
  const [maxPopulationCapital, setMaxPopulationCapital] = useState(null);
  const [minPopulationCapital, setMinPopulationCapital] = useState(null);

  // Hook useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    // Função assíncrona para buscar os dados das capitais
    const fetchData = async () => {
      try {
        // Requisição para a API de países para obter as capitais e suas populações
        const response = await fetch("https://restcountries.com/v3.1/region/europe?fields=capital,population");
        const data = await response.json();

        // Verifica se há dados retornados
        if (data.length > 0) {
          // Ordena os dados pela população em ordem decrescente
          const sortedData = data.sort((a, b) => b.population - a.population);

          // Capital com a maior população (primeiro na lista após ordenação)
          const maxPopulation = sortedData[0];
          // Capital com a menor população (último na lista após ordenação)
          const minPopulation = sortedData[sortedData.length - 1];

          // Atualiza os estados com as capitais encontradas
          setMaxPopulationCapital(maxPopulation);
          setMinPopulationCapital(minPopulation);
        }
      } catch (error) {
        // Exibe um erro no console se a requisição falhar
        console.error("Error fetching data:", error);
      }
    };

    // Chama a função fetchData para buscar os dados
    fetchData();
  }, []); // O array vazio significa que useEffect será chamado apenas uma vez, quando o componente for montado

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




