

function addNewMap({onClose}) {
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
        <label className="block text-sm font-medium mb-2">Supplier Product Name</label>
        <input
          type="text" 
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter supplier product name..."
        
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Standardized Product Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg" 
          placeholder="Enter standardized product name..."
        
        />
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
     
      >
        Save Mapping
      </button>
    </div>
  </div>
  )
}

export default addNewMap
