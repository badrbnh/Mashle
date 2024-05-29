import useSWR from "swr";
import arrow from "../../assets/arrow.svg";
import "../../styles/menu.css";
import { useMediaQuery } from "@mui/material";

const isDevelpment = import.meta.env.MODE === "development";
const BASE_URL = isDevelpment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_PROD;

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
  const isMobile = useMediaQuery("(max-width:600px)");
  const {
    data: apiResponse,
    error,
    isValidating,
  } = useSWR<ApiResponse>(`${BASE_URL}/api/v1/categories/`, fetcher);

  // Handle error state
  if (error) return <div>Failed to load</div>;

  // Handle loading state
  if (isValidating || !apiResponse) return <div>Loading...</div>;

  // Render categories
  return (
    <>
      {apiResponse.results.slice(0, 12).map((category) =>
        !isMobile ? (
          <div className="category" key={category.id}>
            {category.title}
            <img src={arrow} alt="" />
          </div>
        ) : (
          <div className="category-m" key={category.id}>
            {category.title}
            <img src={arrow} alt="" />
          </div>
        )
      )}
    </>
  );
};

export default CategoriesList;
