import React, { useEffect, useState } from "react";
import PortfolioContainer from "./PortfolioContainer";
import StockContainer from "./StockContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  function handleBuyStock(stock) {
    if (!portfolio.includes(stock)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  function handleSellStock(stock) {
    setPortfolio(portfolio.filter((item) => item.id !== stock.id));
  }

  const displayedStocks = stocks
    .filter((stock) => (filterBy === "All" ? true : stock.type === filterBy))
    .sort((a, b) => {
      if (sortBy === "Alphabetically") return a.name.localeCompare(b.name);
      if (sortBy === "Price") return a.price - b.price;
      return 0;
    });

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={displayedStocks} onBuyStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onSellStock={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
