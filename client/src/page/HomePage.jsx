import { GET_CRYPTO_DATA } from '../utils/query';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const { loading, error, data } = useQuery(GET_CRYPTO_DATA);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return <h1>This is the HomePage</h1>;
};

export default HomePage;
