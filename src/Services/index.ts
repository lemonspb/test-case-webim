export default class ApplicationServiсes {
    BASE_URL:string  = "https://emphasoft-test-assignment.herokuapp.com/";
      controller = new AbortController();
      signal = this.controller.signal
   getResource = async (type:string, params:any) => {
     const res = await fetch(`${this.BASE_URL}${type}`,{
      ...params
     });
    return await res.json();
        
   };
 
   getTokenAuth = async (body:any) => {
    
     const  params ={
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json',
        }
       }
     const res = await this.getResource(`api-token-auth/`,params);
     return res
   };

   getListUsers = async () => {
    const  params ={
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
           'Authorization':`Token ${this.getToken()}`,
        }
       }
  const res = await this.getResource(`api/v1/users/`, params);
  return res
};

   exit = async () => {
      window.localStorage.removeItem('token')
};
  
  abort(){
   return this.controller.abort()
  }
  getToken(){
    return  window.localStorage.token
  }
 }