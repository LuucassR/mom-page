import { useEffect, useState } from "react";
import { API_URL } from "../lib/apiConfig";


export default function Test() {
  const [data, setData] = useState([]);


  async function getData() {
    await fetch(`${API_URL}/getCotizaciones`)
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
