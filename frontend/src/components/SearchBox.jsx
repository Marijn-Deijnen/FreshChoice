import "./SearchBox.css";

const SearchBox = ({ placeholder, value, onChange, size = "small" }) => {
  return (
    <div className={`searchbox ${size}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="searchbox-input"
        value={value}
        onChange={onChange}
      />
      <svg
        className="searchbox-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.666" y2="16.666" />
      </svg>
    </div>
  );
};

export default SearchBox;
