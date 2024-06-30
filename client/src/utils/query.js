import { gql } from '@apollo/client';

export const GET_CRYPTO_DATA = gql`
  query GetCryptoData {
    cryptoData {
      name
      color
      rank
      age
      image
      allTimeHigh
      link
      currentPrice
      volume
      marketCap
      changeInHour
      changeInDay
      changeInWeek
      changeInQuarter
      changeInYear
    }
  }
`;
