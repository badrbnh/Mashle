// Define the type for the dish object
interface Dish {
    id: number;
    title: string;
    price: number;
    image: string;
  }
  
  // Define the type for the API response
  interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Dish[]; // Array of Dish objects
  }
  
  // Function to fetch data from the backend
  const fetcher = async (url: string): Promise<ApiResponse> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    return response.json();
  };
  
  export default fetcher;
  