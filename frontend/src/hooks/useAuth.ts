const useAuthToken = () => {
  const getItem = () => {
    if (typeof window !== "undefined") {
      const token = localStorage?.getItem("tozaAuth");
      const isRole = localStorage?.getItem("tozaRole");

      return { token, isRole }; // Return an object with token and chatid prod
    } else {
      return { token: null, isRole: null }; //prod
    }
    // return { token: null }; // Return null if localStorage is not available
  };

  const clearAuthToken = () => {
    if (typeof window !== "undefined") {
      // Remove the token from local storage
      localStorage.removeItem("tozaAuth");
      localStorage.removeItem("tozaRole");
    }
  };

  // Return the token and functions to update and clear it
  return { clearAuthToken, getItem };
};

export default useAuthToken;
