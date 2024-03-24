import useSWR from "swr";
import arrow from "../../assets/arrow.svg";
import "../../styles/menu.css";


const BACKEND_URL = "http://127.0.0.1:8000/api/v1";

// Define the type for the category object
interface Category {
  id: number;
  title: string;
}

// Define the type for the API response
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[]; // Array of Category objects
}

// Function to fetch data from the backend
const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }
  return response.json();
};

// Component to fetch and display categories using SWR
const CategoriesList = () => {
  // Fetch categories data using SWR
  const { data: apiResponse, error, isValidating } = useSWR<ApiResponse>(
    `${BACKEND_URL}/categories/`,
    fetcher
  );


  if (error) return <div>Failed to load</div>;
  if (isValidating || !apiResponse) return <div>Loading...</div>;


  return (
    <>
      {apiResponse.results.map((category) => (
        <div className="category" key={category.id}>
          {category.title}
          <img src={arrow} alt="" />
        </div>
      ))}
    </>
  );
};

export default CategoriesList;
