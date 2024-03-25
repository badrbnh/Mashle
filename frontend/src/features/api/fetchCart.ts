const BACKEND_URL = "http://127.0.0.1:8000/api/v1";

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
      const response = await fetch(`${BACKEND_URL}/carts`, {
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