import React, { useEffect } from "react";
// import fetchCart from "../../features/api/fetchCart";
import useSWR from "swr";

interface CartItem {
  id: number;
  user: number;
  menuitem: MenuItem;
  quantity: number;
  price: number;
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

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartItem[];
}

const API_URL = "http://localhost:8000";
const BACKEND_URL = "http://127.0.0.1:8000/api/v1";

const Payment: React.FC = () => {
  // const [cartID, setCartID] = useState<number | null>(null);
  // const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);

  // useEffect(() => {
  //   const fetchAndSetCartID = async () => {
  //     try {
  //       const fetchedCartID = await fetchCart();
  //       setCartID(fetchedCartID);
  //     } catch (error) {
  //       console.error("Error fetching cart:", error);
  //     }
  //   };
  //   fetchAndSetCartID();
  // }, []);

  const userJSON = localStorage.getItem("user");
  if (!userJSON) {
    throw new Error("User data not found in localStorage.");
  }

  const user = JSON.parse(userJSON);
  if (!user.access) {
    throw new Error("Access token not found in user data.");
  }

  const accessToken = user.access;
  const fetcher = async (url: string): Promise<ApiResponse> => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }

    return response.json();
  };

  const {
    data: apiResponse,
    error,
    isValidating,
  } = useSWR<ApiResponse>(`${BACKEND_URL}/cart-items/`, fetcher);

  // useEffect(() => {
  //   if (apiResponse) {
  //     setLocalCartItems(apiResponse.results);
  //   }
  // }, [apiResponse]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/v2/payment/create-checkout-session/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        mode: 'no-cors',
        
      });
      if (!response.ok) {
        throw new Error('Failed to initiate checkout process');
      }

      console.log('Checkout process initiated successfully');
    } catch (error) {
      console.error('Error initiating checkout process:', error);
    }
  };



  if (error) return <div>Error: {error.message}</div>;
  if (isValidating || !apiResponse) return <div>Loading...</div>;

  let subtotal = 0;
  apiResponse.results.forEach((cart) => {
    subtotal += parseFloat(cart.price.toString());
  });
  // const total = subtotal;

  return (
    <section>
      <div>
        {apiResponse.results.map((cart, index) => (
          <p key={index}>{cart.menuitem.title}</p>
        ))}
      </div>
      <form method="POST" onSubmit={onSubmit}>
        <button type="submit">Checkout</button>
      </form>
    </section>
  );
};

export default Payment;
