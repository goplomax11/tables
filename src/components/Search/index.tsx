import { ChangeEvent } from "react";
import "./index.css";

interface SearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="search">
      <input value={value} onChange={onChange} placeholder="Search" className="search-input" />
    </div>
  );
};

export default Search;
