import { useState } from "react";

//context
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

export function useFetchWithBody(url) {

  const {auth, setAuth}= useContext(AuthContext)
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchWithBody = (body) => {
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Problemas na rede');
      }
      return response.json();
    })
    .then(data => {   
      setAuth(data);
      setResponse(data);
      setError(null);
    })
    .catch(error => {
      setResponse(null);
      setError(error);
    });
  };

  return [fetchWithBody, response, error];
}
