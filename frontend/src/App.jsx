import  { useState } from 'react'
import AddNewMap from './components/addNewMap'

const App = () => {
  const [showAddNewMap, setShowAddNewMap] = useState(false);

  return (
    <div className="p-8 absolute inset-0">
      <h1 className="text-3xl font-bold mb-8">Product Name Matcher</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name from Supplier</label>
          <input 
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter product name..."
          />
        </div>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Check Match
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Match Results:</h2>
        </div>

        <div className="mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
          >
            Confirm Match
          </button>
          
          {showAddNewMap && (
            <AddNewMap
              onClose={() => setShowAddNewMap(false)}
            />
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
  )
}

export default App
