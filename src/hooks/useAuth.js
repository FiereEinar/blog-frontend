import { getTokenFromLocalStorage } from '@/utils/localstorage';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { getUserById } from '@/api/user';

/**
 * 
 * @returns a boolean if the user is logged in
 */
export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const validate = async () => {
        const token = getTokenFromLocalStorage().split(' ')[1];
        const data = jwtDecode(token);
        const userId = data.user._id;

        // ensure that the user actually exists in the database
        const userData = await getUserById(userId);

        setIsLoggedIn(userData !== null)
        console.log(userData);
      }
      validate();
    } catch (err) {
      console.error('Error authenticating user.', err);
    }
  }, []);

  return isLoggedIn;
}
