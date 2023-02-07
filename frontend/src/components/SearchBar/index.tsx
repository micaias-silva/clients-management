import "./style.css";

interface SearchBarProps {
  baseArray: any[];
  setList: (list: any[]) => void;
}

const SearchBar = ({ baseArray, setList }: SearchBarProps) => {
  const filter = (searchParam: string) => {
    const filtered = baseArray.filter(
      (item) =>
        item.name.includes(searchParam) ||
        item.email.includes(searchParam) ||
        item.phoneNumber.includes(searchParam)
    );
    setList(filtered);
  };
  return (
    <input
      className="search-input"
      placeholder="Pesquisar..."
      onChange={(e) => filter(e.target.value)}
    />
  );
};

export default SearchBar;
