const isDevelpment = import.meta.env.MODE === 'development'
const BASE_URL = isDevelpment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD;

const fetchCart = async (): Promise<number> => {
    const userJSON = localStorage.getItem("user");
    if (!userJSON) {
      throw new Error("User data not found in localStorage.");
    }
  
    const user = JSON.parse(userJSON);
    if (!user.access) {
      throw new Error("Access token not found in user data.");
    }
  
    const accessToken = user.access;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/carts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart.");
      }
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error("Cart not found in response.");
      }
      return data.results[0].id;
    } catch (error) {
      throw new Error("Failed to fetch cart.");
    }
  };

export default fetchCart;