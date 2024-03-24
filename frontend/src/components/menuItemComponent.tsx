import useSWR from "swr";


const BACKEND_URL = "http://127.0.0.1:8000/api/v1";

// Define the type for the category object
interface CartItem { 
  id: number;
  user: number;
  menuitem: MenuItem; // Menu item is now nested
  quantity: number; 
  price: string; // Assuming 'price' in the response is a string
}

interface MenuItem {
  id: number;
  title: string;
  price: string;
  description: string;
  category: Category; 
  image: string; 
}

interface Category {
  id: number;
  title: string;
}
// Define the type for the API response
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartItem[];

}

const fetcher = async (url: string): Promise<ApiResponse> => {
  const userJSON = localStorage.getItem('user');
  if (!userJSON) {
    throw new Error("User data not found in localStorage.");
  }

  const user = JSON.parse(userJSON);
  if (!user.access) {
    throw new Error("Access token not found in user data.");
  }

  const accessToken = user.access;
  console.log(accessToken);

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json();
};



const MenuItems = () => {

  const { data: apiResponse, error, isValidating } = useSWR<ApiResponse>(
    `${BACKEND_URL}/cart-items`,
    fetcher
  );

  // Handle error state
  if (error) return <div>Failed to load</div>;

  // Handle loading state
  if (isValidating || !apiResponse) return <div>Loading...</div>;

  return (
    <>
      {apiResponse.results.slice(0, 12).map((cart) => (
        <div className="cart" key={cart.id}>
          {cart.menuitem.title}
        </div>
      ))}
    </>
  );
};

export default MenuItems;
