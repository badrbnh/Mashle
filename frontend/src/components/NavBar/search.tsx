import { useEffect, useRef, useState } from "react";
import "./searchStyle.css";
import searchIcon from "../../assets/search.svg"; // Import the search icon

function Search() {
  const targetRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const showSearchInput: boolean = isHovered || isFocused;

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.value = "";
    }
  }, [showSearchInput]);

  return (
    <div
      className={`search-container ${showSearchInput ? "search-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        ref={targetRef}
        className={`search-input ${showSearchInput ? "show" : ""}`}
        type="text"
      />
      <img src={searchIcon} alt="Search" className="search-icon" />
    </div>
  );
}

export default Search;
