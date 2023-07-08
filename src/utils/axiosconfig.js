const getTokenFromLocalStorage = localStorage.getItem("user")

  ? JSON.parse(localStorage.getItem("user"))
  
  : null
  

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

// export const config = {
//     baseURL: "http://192.168.56.1:3002/",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
  
//   export default config;
  

  
