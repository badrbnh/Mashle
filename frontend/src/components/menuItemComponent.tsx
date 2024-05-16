import useSWR, { mutate } from "swr";
import "../styles/cart.css";
import fetchCart from "../features/api/fetchCart";
import { useEffect, useState } from "react";
import trash from "../assets/trash.svg";

const isDevelpment = import.meta.env.MODE === 'development'
const BASE_URL = isDevelpment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD;

// Define the type for the category object
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

// Define the type for the API response
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartItem[];
}

const MenuItems = () => {
  const [cartID, setCartID] = useState<number | null>(null);
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchAndSetCartID = async () => {
      try {
        const fetchedCartID = await fetchCart();
        setCartID(fetchedCartID);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchAndSetCartID();
  }, []);

  const fetcher = async (url: string): Promise<ApiResponse> => {
    const userJSON = localStorage.getItem("user");
    if (!userJSON) {
      throw new Error("User data not found in localStorage.");
    }

    const user = JSON.parse(userJSON);
    if (!user.access) {
      throw new Error("Access token not found in user data.");
    }

    const accessToken = user.access;

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
  } = useSWR<ApiResponse>(`${BASE_URL}/api/v1/cart-items/`, fetcher);

  useEffect(() => {
    if (apiResponse) {
      setLocalCartItems(apiResponse.results);
    }
  }, [apiResponse]);

  const editQuantity = async (
    itemID: number,
    quantity: number,
    cartItemID: string
  ): Promise<void> => {
    if (cartID === null) {
      throw new Error("Cart ID not fetched yet.");
    }

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
      const response = await fetch(`${BASE_URL}/api/v1/cart-items/${cartItemID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          menuitem_id: itemID,
          cart_id: cartID,
          quantity: quantity,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error("Failed to add quantity to item.");
      }

      const updatedCartItems = localCartItems.map((item) =>
        String(item.id) === cartItemID
          ? { ...item, quantity: quantity, price: result.price }
          : item
      );

      setLocalCartItems(updatedCartItems);

      // Update SWR cache
      mutate(
        `${BASE_URL}/api/v1/cart-items/`,
        { ...apiResponse, results: updatedCartItems },
        false
      );
    } catch (error) {
      throw new Error("Failed to add item to item.");
    }
  };

  const deleteItem = async (cartItemID: string): Promise<void> => {
    if (cartID === null) {
      throw new Error("Cart ID not fetched yet.");
    }

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
      const response = await fetch(`${BASE_URL}/api/v1/cart-items/${cartItemID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete item.");
      }

      const updatedCartItems = localCartItems.filter(
        (item) => String(item.id) !== cartItemID
      );

      setLocalCartItems(updatedCartItems);

      // Update SWR cache
      mutate(
        `${BASE_URL}/api/v1/cart-items/`,
        { ...apiResponse, results: updatedCartItems },
        false
      );
    } catch (error) {
      throw new Error("Failed to delete item.");
    }
  }

  if (error) return <div>Failed to load</div>;

  if (isValidating || !apiResponse) return <div>Loading...</div>;

  let subtotal = 0;
  apiResponse.results.forEach((cart) => {
    subtotal += parseFloat(cart.price.toString());
  });
  const total = subtotal;

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-info">
        <div className="cart-left-half">
          {apiResponse.results.map((cart, index) => (
            <div className="item-container" key={index}>
              <img src={cart.menuitem.image} alt="" />
              <p className="item-title">{cart.menuitem.title}</p>
              <div className="quantity-container">
                <button
                  onClick={() =>
                    editQuantity(
                      cart.menuitem.id,
                      cart.quantity - 1,
                      cart.id.toString()
                    )
                  }
                >
                  -
                </button>
                <p>{cart.quantity}</p>
                <button
                  onClick={() =>
                    editQuantity(
                      cart.menuitem.id,
                      cart.quantity + 1,
                      cart.id.toString()
                    )
                  }
                >
                  +
                </button>
              </div>
              <p className="price">{cart.price} DH</p>
              <button className="delete-item-btn" onClick={() => deleteItem(cart.id.toString())}>
                <img src={trash} alt="" />
              </button>
            </div>
          ))}
        </div>
        <div className="cart-right-half">
          <div>
            <h2>Subtotal: {subtotal} DH</h2>
            <p>Total: {total} DH</p>
          </div>
          <button className="cart-btn-cont">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
