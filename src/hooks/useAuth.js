import { useState, useEffect } from 'react';

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("Token") !== null);
  }, []);

  return isLoggedIn;
}
