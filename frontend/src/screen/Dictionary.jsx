import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import EditDict from "../components/EditDict";
import AddNewMap from "../components/addNewMap";
import { API_URL } from "../helper/url";
const Dictionary = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddNewMap, setShowAddNewMap] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => 
      product.standardized_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.variations.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch products"
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
          await fetch(`${API_URL}/products/${id}`, {
          method: 'DELETE'
        });
        fetchProducts();
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete product"
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowAddNewMap(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Mapping
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-medium">Supplier Product Names</th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-medium">Standardized Product Name</th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm md:text-base">
                  <ul className="list-disc list-inside">
                    {product.variations.map((variation, index) => (
                      <li key={index} className="truncate">{variation}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-4 text-sm md:text-base">{product.standardized_name}</td>
                <td className="px-4 py-4 text-sm md:text-base">{product.status}</td>
                <td className="px-4 py-4 text-sm md:text-base">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-blue-600 hover:text-blue-800 mr-2 md:mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <EditDict
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={fetchProducts}
        />
      )}

      {showAddNewMap && (
        <AddNewMap
          onClose={() => {
            setShowAddNewMap(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
};

export default Dictionary;

