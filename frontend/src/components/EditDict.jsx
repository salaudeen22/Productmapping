

import { useState } from "react";
import Swal from "sweetalert2";

function EditDict({ product, onClose, onUpdate }) {
  const [standardizedName, setStandardizedName] = useState(product.standardized_name);
  const [status, setStatus] = useState(product.status);

  const handleSubmit = async () => {
    if (!standardizedName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please fill in the standardized name'
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:2999/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          standardized_name: standardizedName,
          variations: product.variations,
          status: status
        })
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product updated successfully'
        });
        onUpdate();
        onClose();
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update product'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 space-y-6 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          <label className="block text-sm font-medium mb-2">Standardized Product Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={standardizedName}
            onChange={(e) => setStandardizedName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="mapped">Mapped</option>
            <option value="unmatched">Unmatched</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDict;
