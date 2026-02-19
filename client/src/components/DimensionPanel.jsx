function DimensionPanel({ shapeType, dimensions, setDimensions }) {
  function handleChange(key, value) {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      setDimensions((prev) => ({ ...prev, [key]: parsed }));
    }
  }

  function renderInputs() {
    switch (shapeType) {
      case "RECTANGLE":
        return (
          <>
            {renderSlider("width", "Width", dimensions.width)}
            {renderSlider("height", "Height", dimensions.height)}
          </>
        );
      case "CIRCLE":
        return renderSlider("radius", "Radius", dimensions.radius);
      case "TRIANGLE":
        return (
          <>
            {renderSlider("base", "Base", dimensions.base)}
            {renderSlider("height", "Height", dimensions.height)}
          </>
        );
      default:
        return null;
    }
  }

  function renderSlider(key, label, value) {
    return (
      <div key={key} className="flex flex-col gap-1">
        <div className="flex justify-between text-sm text-gray-600">
          <span className="font-medium">{label}</span>
          <span>{value}px</span>
        </div>
        <input
          type="range"
          min="10"
          max="300"
          value={value}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full accent-blue-500"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-semibold text-gray-600">Dimensions</label>
      {renderInputs()}
    </div>
  );
}

export default DimensionPanel;
