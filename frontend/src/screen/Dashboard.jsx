import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      const response = await fetch("http://localhost:2999/api/products");
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
    <div className="p-8">
     
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-4xl font-bold">{stats.totalProducts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Unmatched Products</h2>
          <p className="text-4xl font-bold">{stats.unmatchedProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Mapped Products</h2>
          <p className="text-4xl font-bold">{stats.mappedProducts}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Link 
          to="/manual-mapping"
          className="bg-blue-500 text-white p-6 rounded-lg shadow hover:bg-blue-600 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Manual Mapping</h2>
          <p>Map product names manually</p>
        </Link>

        <Link
          to="/mapping-dictionary" 
          className="bg-green-500 text-white p-6 rounded-lg shadow hover:bg-green-600 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Mapping Dictionary</h2>
          <p>View and manage all product mappings</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
