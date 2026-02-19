function ShapeSelector({ shapeType, setShapeType }) {
  const shapes = ["RECTANGLE", "CIRCLE", "TRIANGLE"];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">Shape Type</label>
      <select
        value={shapeType}
        onChange={(e) => setShapeType(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {shapes.map((shape) => (
          <option key={shape} value={shape}>
            {shape.charAt(0) + shape.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ShapeSelector;
