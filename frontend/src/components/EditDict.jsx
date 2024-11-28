import { useState } from "react";
import Swal from "sweetalert2";

function EditDict({ product, onClose, onUpdate }) {
  const [standardizedName, setStandardizedName] = useState(product.standardized_name);
  const [status, setStatus] = useState(product.status);
  const [supplierNames, setSupplierNames] = useState(product.variations || []);

  const handleSupplierNameChange = (index, value) => {
    const newNames = [...supplierNames];
    newNames[index] = value;
    setSupplierNames(newNames);
  };

  const addSupplierNameField = () => {
    setSupplierNames([...supplierNames, '']);
  };

  const removeSupplierNameField = (index) => {
    const newNames = supplierNames.filter((_, i) => i !== index);
    setSupplierNames(newNames);
  };

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
          variations: supplierNames.filter(name => name.trim()),
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

        <div className="space-y-4">
          <label className="block text-sm font-medium mb-2">Supplier Product Names</label>
          {supplierNames.map((name, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-lg"
                placeholder="Enter supplier product name..."
                value={name}
                onChange={(e) => handleSupplierNameChange(index, e.target.value)}
              />
              {supplierNames.length > 1 && (
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeSupplierNameField(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            className="text-blue-500 hover:text-blue-700 text-sm"
            onClick={addSupplierNameField}
          >
            + Add another supplier name
          </button>
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
