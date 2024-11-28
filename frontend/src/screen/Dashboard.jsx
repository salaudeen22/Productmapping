import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../helper/url";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    unmatchedProducts: 0,
    mappedProducts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
    const response = await fetch(`${API_URL}/products`);
      const products = await response.json();
      
      setStats({
        totalProducts: products.length,
        unmatchedProducts: products.filter(p => p.status === "unmatched").length,
        mappedProducts: products.filter(p => p.status === "mapped").length
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl md:text-4xl font-bold">{stats.totalProducts}</p>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Unmatched Products</h2>
          <p className="text-3xl md:text-4xl font-bold">{stats.unmatchedProducts}</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Mapped Products</h2>
          <p className="text-3xl md:text-4xl font-bold">{stats.mappedProducts}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Link 
          to="/manual-mapping"
          className="bg-blue-500 text-white p-4 md:p-6 rounded-lg shadow hover:bg-blue-600 transition flex flex-col justify-between"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-2">Manual Mapping</h2>
          <p className="text-sm md:text-base">Map product names manually</p>
        </Link>

        <Link
          to="/mapping-dictionary" 
          className="bg-green-500 text-white p-4 md:p-6 rounded-lg shadow hover:bg-green-600 transition flex flex-col justify-between"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-2">Mapping Dictionary</h2>
          <p className="text-sm md:text-base">View and manage all product mappings</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
