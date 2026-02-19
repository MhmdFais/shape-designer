function ShapeList({
  shapes,
  loading,
  loadShapeForEdit,
  deleteShape,
  selectedShape,
}) {
  if (loading)
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        Loading shapes...
      </p>
    );

  if (shapes.length === 0)
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        No shapes saved yet.
      </p>
    );

  return (
    <div className="flex flex-col gap-2">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors
                        ${
                          selectedShape?.id === shape.id
                            ? "border-blue-400 bg-blue-50"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                        }`}
        >
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              {shape.name}
            </span>
            <span className="text-xs text-gray-400">{shape.type}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => loadShapeForEdit(shape)}
              className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium px-3 py-1 rounded-lg transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => deleteShape(shape.id)}
              className="text-xs bg-red-100 hover:bg-red-200 text-red-600 font-medium px-3 py-1 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShapeList;
