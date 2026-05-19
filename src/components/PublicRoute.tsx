import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  if (token) {
    return null; 
  }

  return <>{children}</>;
};

export default PublicRoute;
