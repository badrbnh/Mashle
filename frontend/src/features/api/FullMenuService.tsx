import useSWR from "swr";
import "../../styles/menu.css";
import bag from "../../assets/shoppingBag.svg";
import { useSearchContext } from "../../components/SearchContext";
import fetcher from "../../components/fetcher";

const BACKEND_URL = "http://127.0.0.1:8000/api/v1";

const FullMenuList = () => {
  const { searchQuery } = useSearchContext(); // Use the context to get the search query

  const {
    data: apiResponse,
    error,
    isValidating,
  } = useSWR(`${BACKEND_URL}/menu-items/?search=${searchQuery}`, fetcher);

  return (
    <>
      {error && <div>Failed to load</div>}
      {(isValidating || !apiResponse) && <div>Loading...</div>}
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
                <button className="add-cart">Add to cart</button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default FullMenuList;
