import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:4000/healthipro/api/users", // Replace with your API base URL
    timeout: 5000, // Set a timeout in milliseconds
    headers: {
      "Content-Type": "application/json",
    },
  });
  
export const loginUser = async (loginData: any, login: (user: any) => void) => {
    try {
        const response = await apiClient.post("/login", loginData);
        console.log('response.data', response.data)
        login(response.data.token);
        return response;
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
}

export const registerUser = (registerData: any) => {

    const response = apiClient.post("/register", registerData);
    return response;

}

export const getUserDetails = async(token: any) =>{
  try {
    const response = await apiClient.get(`/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching User Details:', error);
    throw error;
  }
}

export const saveCalories=async (token: any, calorieData: any)=> {
  const response = apiClient.post("/save-calories",
    {calorieData},
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

