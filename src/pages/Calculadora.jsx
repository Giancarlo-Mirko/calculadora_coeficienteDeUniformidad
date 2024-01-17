import { useEffect, useState } from 'react';
import './calculadora.css';

export const Calculadora = () => {
  const [valueInput, setValueInput] = useState('');
  const [numeros, setNumeros] = useState([]);
  const [result, setResult] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  const clasificador = (value) => {
    if (value > 90) {
      setClasificacion('Excelente');
      setBackgroundColor('#008037');
    } else if (value > 80) {
      setClasificacion('Buena');
      setBackgroundColor('#7ED957');
    } else if (value > 70) {
      setClasificacion('Aceptable');
      setBackgroundColor('#FFDE59');
    } else {
      setClasificacion('Inaceptable');
      setBackgroundColor('#FF1616');
    }
  };

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
      const finalRound = parseFloat(final.toFixed(2));
      clasificador(finalRound);
      setResult(`${finalRound} %`);
      setValueInput('');
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
    setClasificacion('');
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
          <h1>
            <span> Calculadora </span>
            <br />
            <br />
            Coeficiente de Uniformidad
          </h1>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="number"
            onChange={HandleChange}
            value={valueInput}
            // onKeyDown={handleKeyPress}
            placeholder="Ingresa dato"
            step="0.001"
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
        <div className="clasificacionContainer">
          <h3>Resultado: </h3>
          <h3 className="result">{result}</h3>
        </div>
        <div className="clasificacionContainer">
          <h3>Clasificación:</h3>
          {clasificacion && (
            <div
              className="clasificacionResult"
              style={{ backgroundColor: backgroundColor }}
            >
              <p>{clasificacion}</p>{' '}
            </div>
          )}
        </div>
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
