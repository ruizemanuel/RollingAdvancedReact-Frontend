const config = () => {
    //const token = JSON.parse(window.localStorage.getItem('persist:auth'))?.token;
    const token = JSON.parse(localStorage.getItem("user-token"))?.token
    const headers = {
      headers: {
        "x-access-token": '',
      },
    };
    if (token) {
      //headers.headers.authorization = `Bearer ${token.replace(/"/g, '')}`;
      headers.headers["x-access-token"] = token;
    }
    return headers;
  };
  
  export default config;
  