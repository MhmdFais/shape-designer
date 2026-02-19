import LoadingSpinner from "./LoadingSpinner";

function ShapeForm({
  shapeName,
  setShapeName,
  selectedShape,
  saveShape,
  clearSelection,
  saving,
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-gray-600">Shape Name</label>
      <input
        type="text"
        placeholder="Enter shape name..."
        value={shapeName}
        onChange={(e) => setShapeName(e.target.value)}
        disabled={saving}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <div className="flex gap-2">
        <button
          onClick={saveShape}
          disabled={saving}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <LoadingSpinner size="sm" text="" /> Saving...
            </>
          ) : selectedShape ? (
            "Update Shape"
          ) : (
            "Save Shape"
          )}
        </button>
        {selectedShape && !saving && (
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
