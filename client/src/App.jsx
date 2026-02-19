import { useShape } from "./hooks/useShape";
import ShapeSelector from "./components/ShapeSelector";
import ShapeCanvas from "./components/ShapeCanvas";
import DimensionPanel from "./components/DimensionPanel";
import ShapeProperties from "./components/ShapeProperties";
import ShapeForm from "./components/ShapeForm";
import ShapeList from "./components/ShapeList";

function App() {
  const {
    shapes,
    selectedShape,
    shapeType,
    setShapeType,
    dimensions,
    setDimensions,
    shapeName,
    setShapeName,
    error,
    loading,
    saveShape,
    deleteShape,
    loadShapeForEdit,
    clearSelection,
  } = useShape();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shape Designer</h1>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel - Controls */}
        <div className="col-span-1 flex flex-col gap-5 bg-white rounded-xl shadow-sm p-5">
          <ShapeSelector shapeType={shapeType} setShapeType={setShapeType} />
          <DimensionPanel
            shapeType={shapeType}
            dimensions={dimensions}
            setDimensions={setDimensions}
          />
          <ShapeProperties shapeType={shapeType} dimensions={dimensions} />
          <ShapeForm
            shapeName={shapeName}
            setShapeName={setShapeName}
            selectedShape={selectedShape}
            saveShape={saveShape}
            clearSelection={clearSelection}
          />
        </div>

        {/* Middle Panel - Canvas */}
        <div className="col-span-1">
          <ShapeCanvas shapeType={shapeType} dimensions={dimensions} />
        </div>

        {/* Right Panel - Saved Shapes */}
        <div className="col-span-1 bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">
            Saved Shapes
          </h2>
          <ShapeList
            shapes={shapes}
            loading={loading}
            loadShapeForEdit={loadShapeForEdit}
            deleteShape={deleteShape}
            selectedShape={selectedShape}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
