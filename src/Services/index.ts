export default class ApplicationServiсes {
    BASE_URL:string  = "http://emphasoft-test-assignment.herokuapp.com/";
      controller = new AbortController();
      signal = this.controller.signal
   getResource = async (type:string, user_auth:any) => {
     const res = await fetch(`${this.BASE_URL}${type}`,{
            method: 'POST',
            body: JSON.stringify(user_auth),
            headers: {
                'Content-Type': 'application/json'
              }
     });
 
            return await res.json();
        
   };
 
   getTokenAuth = async (body:any) => {
       const bodys = {
        ...body
       }
     const res = await this.getResource(`api-token-auth/`,bodys);
       try {
        console.log(res)
       } catch (error) {
          console.log(error) 
       }
   };
 
  
  abort(){
   return this.controller.abort()
  }
 }