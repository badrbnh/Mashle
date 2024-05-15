import { useState, useEffect } from "react";
import useSWR from "swr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/menu.css";
import bag from "../../assets/shoppingBag.svg";
import { useSearchContext } from "../../components/SearchContext";
import fetcher from "../../components/fetcher";
import "../../styles/order_popup.css";
import Popup from "reactjs-popup";
import Spinner from "../../components/spnner";
import fetchCart from "./fetchCart";

const isDevelopment = import.meta.env.MODE === 'development'
const baseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD

const addItemToCart = async (itemID: number, cartID: number): Promise<void> => {
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
    const item_exist_response = await fetch(`${baseUrl}/api/v1/cart-items/?search=${itemID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
      
    if (!item_exist_response.ok) {
      throw new Error("Failed to check item existence in cart.");
    }
      
    const item_exist = await item_exist_response.json();
    if (item_exist.results.length > 0) {
      // Item exists in the cart, show a message
      toast.warn("Item is already in the cart.", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const response = await fetch(`${baseUrl}/api/v1/cart-items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        menuitem_id: itemID,
        cart_id: cartID
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart.");
    }

    toast.success("Item added to cart!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } catch (error) {
    toast.error("Failed to add item to cart. Please try again later.", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    console.error("Error adding item to cart:", error);
  }
};

const FullMenuList = () => {
  const { searchQuery } = useSearchContext();
  const { data: apiResponse, error, isValidating } = useSWR(
    `${baseUrl}/api/v1/menu-items/?search=${searchQuery}`,
    fetcher
  );

  const [cartID, setCartID] = useState<number | null>(null);

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

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (itemID: number) => {
    setIsAddingToCart(true);
    try {
      if (cartID === null) {
        throw new Error("Cart ID not fetched yet.");
      }
      await addItemToCart(itemID, cartID);

    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <>
      
      {error && <div>Failed to load</div>}
      {(isValidating || !apiResponse) && <Spinner />}
      {apiResponse && (
        <>

          {apiResponse.results.map((menu: any) => (
            <div className="dish-container" key={menu.id}>
              <div className="dish-img">
                <img src={`${menu.image}`} alt="" />
              </div>
              <p>{menu.title}</p>
              <p className="dish-price">{menu.price} DH</p>
              <div className="add-cart-container">
                <img src={bag} alt="" />
                <Popup
                  trigger={<button className="add-cart">Add to cart</button>}
                  modal
                  position="center center"
                >
                  <div className="popup-container">
                    <div className="popup-dish-img">
                      <img src={`${menu.image}`} alt="" />
                    </div>
                    <div className="popup-right-half">
                      <h1>{menu.title}</h1>
                      <p className="dish-price">{menu.price} DH</p>
                      <p>{menu.description}</p>
                      <div className="popup-btn-cont">
                        <button
                          className="add-cart"
                          onClick={() => handleAddToCart(menu.id)}
                          disabled={isAddingToCart}
                        >
                          {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
                        </button>
                        <button className="add-cart">Checkout</button>
                      </div>
                    </div>
                  </div>
                </Popup>
              </div>
            </div>
          ))}
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default FullMenuList;
