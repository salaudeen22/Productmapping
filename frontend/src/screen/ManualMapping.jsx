import { useEffect, useState } from "react";
import AddNewMap from "../components/addNewMap";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import { API_URL } from "../helper/url";

const ManualMapping = () => {
  const [showAddNewMap, setShowAddNewMap] = useState(false);
  const [inputProduct, setInputProduct] = useState("");
  const [matchResult, setMatchResult] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error fetching products",
      });
    }
  };

  const checkMatch = () => {
    if (!inputProduct.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please enter a product name",
      });
      return;
    }

    const searchList = products.flatMap((product) =>
      product.variations.map((variation) => ({
        product,
        variation,
      }))
    );

    const options = {
      keys: ["variation"],
      includeScore: true,
      threshold: 0.5,
      ignoreLocation: true,
    };

    const fuse = new Fuse(searchList, options);
    const searchResults = fuse.search(inputProduct);

    // Group results by product ID to avoid duplicates
    const uniqueResults = searchResults.reduce((acc, result) => {
      const productId = result.item.product._id;
      if (!acc[productId] || result.score < acc[productId].score) {
        acc[productId] = {
          product: result.item.product,
          variation: result.item.variation,
          score: result.score
        };
      }
      return acc;
    }, {});

    const topMatches = Object.values(uniqueResults)
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);

    setMatchResult(topMatches.length > 0 ? topMatches : null);
    if (topMatches.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Matches",
        text: "No matches found",
      });
    }
  };

  const confirmMatch = async () => {
    if (!matchResult) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select a match first",
      });
      return;
    }

    if (!selectedMatch) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select one of the matches",
      });
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/products/${selectedMatch.product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            standardized_name: selectedMatch.product.standardized_name,
            variations: [...selectedMatch.product.variations, inputProduct],
            status: "mapped"
          }),
        }
      );

      if (response.ok) {
        fetchProducts();
        setInputProduct("");
        setMatchResult(null);
        setSelectedMatch(null);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Match confirmed successfully",
        });
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error confirming match:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error confirming match",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Name from Supplier
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter product name..."
            value={inputProduct}
            onChange={(e) => setInputProduct(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={checkMatch}
        >
          Check Match
        </button>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Match Results:</h2>
          <div className="p-4 border rounded-lg">
            {matchResult ? (
              <div>
                <p className="font-medium mb-2">Found potential match:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    {matchResult.map((match, index) => (
                      <div className="ml-4 flex items-center gap-2" key={index}>
                        <input
                          type="radio"
                          name="matchSelection"
                          value={match.product.standardized_name}
                          id={`match-${index}`}
                          onChange={() => setSelectedMatch(match)}
                          checked={selectedMatch === match}
                        />
                        <label htmlFor={`match-${index}`}>
                          {match.product.standardized_name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">
                No matches found yet. Please enter a product name and click
                Check Match.
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
            onClick={confirmMatch}
            disabled={!matchResult || !selectedMatch}
          >
            Confirm Match
          </button>

          {showAddNewMap && (
            <AddNewMap onClose={() => setShowAddNewMap(false)} />
          )}

          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            onClick={() => setShowAddNewMap(true)}
          >
            Add New Mapping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualMapping;

