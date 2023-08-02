/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react'; 
 import PropTypes from 'prop-types'; 
  
 const UserContext = createContext(); 
  
 const UserProvider = ({ children }) => { 
   const [user, setUser] = useState(null); 
  
   return ( 
     <UserContext.Provider value={{ user, setUser }}> 
       {children} 
     </UserContext.Provider> 
   ); 
 }; 
  
 UserProvider.propTypes = { 
   children: PropTypes.node.isRequired, 
 }; 
  
 export { UserContext, UserProvider };