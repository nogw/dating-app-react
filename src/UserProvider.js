import jwtDecode from 'jwt-decode';
import React, { useState } from 'react'

export const Context = React.createContext();

const UserProvider = ({ children }) => {
  const tokenString = localStorage.getItem('user');
  const userToken = JSON.parse(tokenString)
  const decoded = userToken ? jwtDecode(userToken) : ""

  const [user, setUser] = useState(decoded);
  
  return (
    <Context.Provider value={[ user, setUser ]}>
      {children}
    </Context.Provider>
  )
}

export default UserProvider