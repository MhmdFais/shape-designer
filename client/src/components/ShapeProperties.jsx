function ShapeProperties({ shapeType, dimensions }) {
  function calculateProperties() {
    switch (shapeType) {
      case "RECTANGLE": {
        const { width, height } = dimensions;
        return {
          Area: (width * height).toFixed(2),
          Perimeter: (2 * (width + height)).toFixed(2),
          Width: width,
          Height: height,
        };
      }
      case "CIRCLE": {
        const { radius } = dimensions;
        return {
          Area: (Math.PI * radius * radius).toFixed(2),
          Circumference: (2 * Math.PI * radius).toFixed(2),
          Radius: radius,
          Diameter: radius * 2,
        };
      }
      case "TRIANGLE": {
        const { base, height } = dimensions;
        const side = Math.sqrt(Math.pow(base / 2, 2) + Math.pow(height, 2));
        return {
          Area: (0.5 * base * height).toFixed(2),
          Perimeter: (base + 2 * side).toFixed(2),
          Base: base,
          Height: height,
        };
      }
      default:
        return {};
    }
  }

  const properties = calculateProperties();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">Properties</label>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(properties).map(([key, value]) => (
          <div
            key={key}
            className="bg-blue-50 rounded-lg px-3 py-2 flex flex-col"
          >
            <span className="text-xs text-blue-400 font-medium">{key}</span>
            <span className="text-sm font-bold text-blue-700">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShapeProperties;
