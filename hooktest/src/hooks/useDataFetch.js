import {useQuery } from "react-query";
import axios from "axios";

const getData = async () => {
  const {res} = await axios.get (
    "/data"
  ).then((response) => {console.log(response);
    return response.data;}
  )
  return response.data;
};

/*
const getData = async () => {
  const res = await fetch("/data");
  console.log(res)
  return res;
};
*/

export const useDataFetch = () =>  {
  const {data,isLoading} =  useQuery("fetch",getData);
  return {data,isLoading};
}
