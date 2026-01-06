import { useMemo, useState } from "react";
import data from "../../data/loot_data.json";
import "./SearchableTable.css";

type Item = {
  name: string;
  rarity: string;
  action: string;
  price: number;
};

export function SearchableTable() {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    return (data as Item[]).filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="table-wrapper">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="table-search"
      />

      <div className="table-container">
        <table className="searchable-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rarity</th>
              <th>Action</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, i) => (
              <tr key={i} className={i % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{item.name}</td>

                <td
                  className={`rarity ${item.rarity.toLowerCase()}`}
                >
                  {item.rarity}
                </td>

                <td>{item.action}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}