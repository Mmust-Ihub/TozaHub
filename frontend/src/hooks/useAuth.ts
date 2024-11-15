const useAuthToken = () => {
  const getItem = () => {
    if (typeof window !== "undefined") {
      const token = localStorage?.getItem("tozaAuth");
      const isRole = localStorage?.getItem("tozaRole");
      const userEmail = localStorage?.getItem('email')

      return { token, isRole,userEmail }; // Return an object with token and chatid prod
    } else {
      return { token: null, isRole: null,userEmail:null }; //prod
    }
    // return { token: null }; // Return null if localStorage is not available
  };

  const clearAuthToken = () => {
    if (typeof window !== "undefined") {
      // Remove the token from local storage
      localStorage.removeItem("tozaAuth");
      localStorage.removeItem("tozaRole");
      localStorage.removeItem("email");
    }
  };

  // Return the token and functions to update and clear it
  return { clearAuthToken, getItem };
};

export default useAuthToken;
