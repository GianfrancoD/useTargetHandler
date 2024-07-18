import { useEffect, useState } from "react";
import "./App.css";
import useTarget from "./components/useTarget";

function App() {
  const [target, setTarget, handleSubmit] = useTarget({
    nombre: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://0.0.0.0:0000/registrados", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Usuarios</label>
        <input
          type="text"
          name="nombre"
          value={target.nombre}
          onChange={setTarget}
        />
        <button type="submit">Enviar</button>
      </form>
      {data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.nombre}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
