import { useState, useEffect } from 'react';

/**
 * 
 * @returns a boolean if the user is logged in
 */
export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("Token") !== null);
  }, []);

  return isLoggedIn;
}
