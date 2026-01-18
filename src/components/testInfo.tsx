import { useEffect, useState } from "react";


export default function Test() {
  const [data, setData] = useState([]);


  async function getData() {
    await fetch("/getCotizaciones")
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log(data)
  }

  return (
    <div>
      <button onClick={getData}>Sumit</button>
      <br />
    </div>
  );
}
