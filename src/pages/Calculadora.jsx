import { useEffect, useState } from 'react';
import './calculadora.css';

export const Calculadora = () => {
  const [valueInput, setValueInput] = useState('');
  const [numeros, setNumeros] = useState([]);
  const [result, setResult] = useState('');

  const HandleChange = (event) => {
    setValueInput(event.target.value);
  };

  const handleClickCalcular = () => {
    if (numeros == '') {
      console.log('Ingrese datos');
    } else {
      const numero2 = numeros.map((texto) => parseFloat(texto));
      const promedio =
        numero2.reduce((acumulador, numero) => acumulador + numero, 0) /
        numeros.length;
      console.log('el promedio:', promedio);
      const n = numeros.length;
      console.log('n:', n);
      const sumatoria = numero2.reduce(
        (acumulador2, numero2) => acumulador2 + Math.abs(promedio - numero2),
        0
      );
      console.log('la sumatoria es:', sumatoria);
      const final = (1 - sumatoria / (n * promedio)) * 100;
      setResult(final);
      setValueInput('');
      console.log('clik');
      console.log(numeros);
    }
  };

  const agregarNumero = () => {
    if (valueInput === '') {
      console.log('agregue un numero');
    } else {
      console.log(valueInput);
      setNumeros([...numeros, valueInput]);
      setValueInput('');
    }
  };

  const handleClickReiniciar = () => {
    setNumeros([]);
    setValueInput('');
    setResult('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const numeroValidado = parseFloat(valueInput);
    if (!isNaN(numeroValidado)) {
      setNumeros([...numeros, numeroValidado]);
      setValueInput('');
    } else {
      console.log('Ingrese un número válido');
    }
  };

  useEffect(() => {
    return () => {};
  }, [numeros]);

  return (
    <>
      <div className="container">
        <div>
          <h1>Calculadora</h1>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={HandleChange}
            value={valueInput}
            // onKeyDown={handleKeyPress}
            placeholder="Ingresa dato"
          />
          <div className="buttonContainer">
            <button type="button" onClick={agregarNumero}>
              Agregar
            </button>
            <button type="button" onClick={handleClickCalcular}>
              Calcular
            </button>
            <button type="button" onClick={handleClickReiniciar}>
              Reiniciar
            </button>
          </div>
        </form>
        <h3>Resultado: {result}</h3>
        <div>
          <h4>Datos:</h4>
          <ul>
            {numeros.map((e, index) => (
              <li key={index}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
