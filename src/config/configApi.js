const config = () => {
  const token = JSON.parse(window.localStorage.getItem('persist:auth'))?.token;
    const headers = {
      headers: {
        "x-access-token": '',
      },
    };
    if (token) {
      headers.headers["x-access-token"] = `${token.replace(/"/g, '')}`;
    }
    return headers;
  };
  
  export default config;
  