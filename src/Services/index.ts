import { UserInfo } from '../Interface';


interface Params {
  method: string,
  body?: string,
  headers: {}
}

export default class ApplicationServiсes {
  BASE_URL: string = "https://emphasoft-test-assignment.herokuapp.com/";
  getResource = async (type: string, params: Params) => {
return fetch(`${this.BASE_URL}${type}`, {...params})
    .then(res => {
      if (!res.ok) {
        return {
          status: 'error',
          resResult: res.json(),
        };
      }
      else{
        return {
        status: 'ok',
        resResult: res.json(),
        }
      }
    }).catch(e => {
      return e;
    });
  };

  getTokenAuth = async (body: UserInfo) => {

    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const res = this.getResource(`api-token-auth/`, params);
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

  createNewUser = async (body: UserInfo) => {
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

  editUser = async (body: UserInfo, id: number) => {
    const params = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.getToken()}`,

      }
    }
    const res = await this.getResource(`api/v1/users/${id}/`, params);
    return res
  };


  exit = async () => {
    window.localStorage.removeItem('token')
  };

  getToken() {
    return window.localStorage.token
  }
}