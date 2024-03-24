import useSWR from "swr";
import "../../styles/menu.css";
import bag from "../../assets/shoppingBag.svg";
import { useSearchContext } from "../../components/SearchContext";
import fetcher from "../../components/fetcher";
import "../../styles/order_popup.css";
import Popup from "reactjs-popup";
import Spinner from "../../components/spnner";

const BACKEND_URL = "http://127.0.0.1:8000/api/v1";

const FullMenuList = () => {
  const { searchQuery } = useSearchContext();

  const {
    data: apiResponse,
    error,
    isValidating,
  } = useSWR(`${BACKEND_URL}/menu-items/?search=${searchQuery}`, fetcher);

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
                    <button className="add-cart">Add to cart</button>
                    <button className="add-cart">Checkout</button>
                    </div>
                    </div>
                  </div>
                </Popup>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default FullMenuList;
