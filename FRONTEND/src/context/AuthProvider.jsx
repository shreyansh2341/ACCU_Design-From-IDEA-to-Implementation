import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const REACT_APP_BACKEND_URL = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState(null);
  const [authenticatedUser, setauthenticatedUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/user/my-profile`, {
          withCredentials: true,
        });
        setauthenticatedUser(data.user); 
        setProfile(data.user); 
      } catch (error) {
        
        setauthenticatedUser(null);
        setProfile(null);
        console.error("Authentication check failed:", error); 
      } finally {
        
        try {
          const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/api/blog/all-blogs`, {
            withCredentials: true,
          });
          setBlogs(data.allblogs);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
        setLoading(false); 
      }
    };

    initialize();
  }, []); 

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        authenticatedUser, 
        setauthenticatedUser, 
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };