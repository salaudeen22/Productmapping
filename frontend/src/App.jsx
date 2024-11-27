import { useEffect, useState } from "react";
import AddNewMap from "./components/addNewMap";

const App = () => {
  const [showAddNewMap, setShowAddNewMap] = useState(false);
  const [inputProduct, setInputProduct] = useState("");
  const [matchResult, setMatchResult] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3999/api/products");
      const data = await response.json();
      setProducts(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products");
    }
  };

  const checkMatch = () => {
    if (!inputProduct.trim()) {
      setError("Please enter a product name");
      return;
    }
    setError("");
    const normalizedInputProduct = inputProduct.trim().toLowerCase();

    const levenshteinDistance = (str1, str2) => {
      const matrix = Array(str2.length + 1)
        .fill()
        .map(() => Array(str1.length + 1).fill(0));

      for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
      for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

      for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
          const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
          matrix[j][i] = Math.min(
            matrix[j - 1][i] + 1,
            matrix[j][i - 1] + 1,
            matrix[j - 1][i - 1] + cost
          );
        }
      }
      return matrix[str2.length][str1.length];
    };

    const matches = products.reduce((acc, product) => {
      if (product === matchResult) return acc;

      const productMatches = product.variations
        .map((variation) => {
          const normalizedVariation = variation.trim().toLowerCase();
          const distance = levenshteinDistance(
            normalizedInputProduct,
            normalizedVariation
          );
          const maxLength = Math.max(
            normalizedInputProduct.length,
            normalizedVariation.length
          );
          const score = distance / maxLength;

          return {
            product,
            variation,
            score,
          };
        })
        .filter((match) => match.score < 0.5);

      return [...acc, ...productMatches];
    }, []);

    matches.sort((a, b) => a.score - b.score);

    const topMatches = matches.slice(0, 3);

    setMatchResult(topMatches.length > 0 ? topMatches : null);
    if (topMatches.length === 0) {
      setError("No matches found");
    }

    console.log(topMatches);
  };

  const confirmMatch = async () => {
    if (!matchResult) {
      setError("Please select a match first");
      return;
    }

    if (!selectedMatch) {
      setError("Please select one of the matches");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3999/api/products/${selectedMatch.product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            standardized_name: selectedMatch.product.standardized_name,
            variations: [...selectedMatch.product.variations, inputProduct],
          }),
        }
      );

      if (response.ok) {
        fetchProducts();
        setInputProduct("");
        setMatchResult(null);
        setSelectedMatch(null);
        setError("");
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error confirming match:", error);
      setError("Error confirming match");
    }
  };

  return (
    <div className="p-8 absolute inset-0">
      <h1 className="text-3xl font-bold mb-8">Product Name Matcher</h1>

      <div className="space-y-6">
        {error && <div className="text-red-500">{error}</div>}{" "}
        {/* Added error display */}
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

export default App;
