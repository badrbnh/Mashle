import useSWR from "swr";
import arrow from "../../assets/arrow.svg";
import "../../styles/menu.css";
import { useMediaQuery } from "@mui/material";


const isDevelpment = import.meta.env.MODE === 'development'
const BASE_URL = isDevelpment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD;


interface Category {
  id: number;
  title: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}


const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }
  return response.json();
};


const CategoriesList = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const {
    data: apiResponse,
    error,
    isValidating,
  } = useSWR<ApiResponse>(`${BASE_URL}/api/v1/categories/`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (isValidating || !apiResponse) return <div>Loading...</div>;

  return (
    <>
      {apiResponse.results.map((category) => (
        <div className={!isMobile ? "category" : "category-m"  }key={category.id}>
          {category.title}
          <img src={arrow} alt="" />
        </div>
      ))}
    </>
  );
};

export default CategoriesList;
