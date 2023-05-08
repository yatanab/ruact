import { Domain, EndPoint } from "../constant/Api"

export const test = async () => {
  const response = await fetch(
    Domain + EndPoint.test,
    {
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, 
    }
  )
  return response
}