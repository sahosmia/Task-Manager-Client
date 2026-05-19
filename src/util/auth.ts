import api from "../api/axios";

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: any;
  };
  message?: string;
}

export const loginUser = async (credentials: any): Promise<AuthResponse> => {
  try {
    const response = await api.post("/login", credentials);

    if (response.data.success) {
      const token = response.data.data.token;
      localStorage.setItem("auth_token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error; 
  }
};

export const registerUser = async (userData: any): Promise<AuthResponse> => {
  try {
    const response = await api.post("/register", userData);
    
    if (response.data.success) {
      const token = response.data.data.token;
      if (token) {
        localStorage.setItem("auth_token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }

    return response.data;
  } catch (error: any) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem("auth_token");
  delete api.defaults.headers.common["Authorization"];
};
