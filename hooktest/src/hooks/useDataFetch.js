import {useQuery } from "react-query";
import axios from "axios";

const getData = async () => {
  const {data} = await axios.get (
    "/data"
  ).then((response) => {//console.log(response);
    return {data:response.data};
  });
  return data;
};

/*
const getData = async () => {
  const res = await fetch("/data");
  console.log(res)
  return res;
};
*/

export const useDataFetch = () =>  {
  const {data,isLoading} =  useQuery("[fetch]",getData,{
    notifyOnChangeProps:["data","isLoading","error"],
    refetchInterval: 3000,
  });
  return {data,isLoading};
}
