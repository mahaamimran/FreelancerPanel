import React from "react";

const Filters = () => {
    return (
      <aside className="bg-gray-50 p-6 rounded-lg shadow h-full">
        <h2 className="text-lg font-semibold text-dark">Filters</h2>
        <div className="mt-4 space-y-4">
          {/* Location Filters */}
          <h3 className="text-sm font-medium text-gray-600">Location</h3>
          <div className="space-y-2">
            <label className="block">
              <input type="radio" name="location" className="mr-2" />
              Near me
            </label>
            <label className="block">
              <input type="radio" name="location" className="mr-2" />
              Remote job
            </label>
            <label className="block">
              <input type="radio" name="location" className="mr-2" />
              Exact location
            </label>
          </div>
  
          {/* Salary Filters */}
          <h3 className="text-sm font-medium text-gray-600">Salary</h3>
          <div className="space-y-2">
            <label className="block">
              <input type="radio" name="salary" className="mr-2" />
              Any
            </label>
            <label className="block">
              <input type="radio" name="salary" className="mr-2" />
              &gt; 30,000
            </label>
            <label className="block">
              <input type="radio" name="salary" className="mr-2" />
              &gt; 50,000
            </label>
          </div>
        </div>
      </aside>
    );
  };

  export default Filters;