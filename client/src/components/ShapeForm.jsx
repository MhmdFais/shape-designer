function ShapeForm({
  shapeName,
  setShapeName,
  selectedShape,
  saveShape,
  clearSelection,
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-gray-600">Shape Name</label>
      <input
        type="text"
        placeholder="Enter shape name..."
        value={shapeName}
        onChange={(e) => setShapeName(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button
          onClick={saveShape}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          {selectedShape ? "Update Shape" : "Save Shape"}
        </button>
        {selectedShape && (
          <button
            onClick={clearSelection}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default ShapeForm;
