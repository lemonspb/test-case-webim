export default class ApplicationServiсes {
  BASE_URL: string = "https://emphasoft-test-assignment.herokuapp.com/";
  getResource = async (type: string, params: any) => {
    const res = await fetch(`${this.BASE_URL}${type}`, {
      ...params
    })

    if (!res.ok) {
      const status  =  res.status
      const resResult = res.json()

      return await {
        resResult,
        status
      }
    }
    return await res.json();

  };

  getTokenAuth = async (body: any) => {

    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const res =  this.getResource(`api-token-auth/`, params);
    return res
  };

  getListUsers = async () => {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.getToken()}`,
      }
    }
    const res = await this.getResource(`api/v1/users/`, params);
    return res
  };

  createNewUser = async (body:any) => {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.getToken()}`,

      }
    }
    const res = await this.getResource(`api/v1/users/`, params);
    return res
  };

  exit = async () => {
    window.localStorage.removeItem('token')
  };

  getToken() {
    return window.localStorage.token
  }
}