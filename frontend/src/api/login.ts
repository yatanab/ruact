import { Domain, EndPoint } from "../constant/Api"


type LoginInfo = {
  userId: string,
  password: string,
}

export const login = async (loginInfo: LoginInfo) => {
  const response = await fetch(
    Domain + EndPoint.login,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    }
  )
  return response.json()
}