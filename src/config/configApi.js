const config = () => {
    const token = JSON.parse(localStorage.getItem("user-token"))?.token
    const headers = {
      headers: {
        "x-access-token": '',
      },
    };
    if (token) {
      headers.headers["x-access-token"] = token;
    }
    return headers;
  };
  
  export default config;
  