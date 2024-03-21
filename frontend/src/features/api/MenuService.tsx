import useSWR from "swr";
import "../../styles/menu.css";
import bag from "../../assets/shoppingBag.svg";
const BACKEND_URL = "http://127.0.0.1:8000/api/v1";

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

const MenuList = () => {
  const {
    data: apiResponse,
    error,
    isValidating,
  } = useSWR<ApiResponse>(`${BACKEND_URL}/menu-items/`, fetcher);

  if (error) return <div>Failed to load</div>;

  if (isValidating || !apiResponse) return <div>Loading...</div>;


  return (
    <>
      {apiResponse.results.slice(0, 12).map((menu) => (
        <div className="dish-container" key={menu.id}>
          <div className="dish-img">
            <img src={menu.image} alt="" />
          </div>
          <p>{menu.title}</p>
          <p className="dish-price">{menu.price} DH</p>
          <div className="add-cart-container">
            <img src={bag} alt="" />
            <button className="add-cart">Add to cart</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuList;
