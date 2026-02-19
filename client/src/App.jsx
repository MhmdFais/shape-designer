import { useShape } from "./hooks/useShape";
import ShapeSelector from "./components/ShapeSelector";
import ShapeCanvas from "./components/ShapeCanvas";
import DimensionPanel from "./components/DimensionPanel";
import ShapeProperties from "./components/ShapeProperties";
import ShapeForm from "./components/ShapeForm";
import ShapeList from "./components/ShapeList";
import LoadingSpinner from "./components/LoadingSpinner";

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
    saving,
    deletingId,
    editingId,
    saveShape,
    deleteShape,
    loadShapeForEdit,
    clearSelection,
  } = useShape();

  if (loading && shapes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Shape Designer..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Shape Designer
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Create, visualize and save geometric shapes
        </p>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl flex items-center gap-2">
            {error}
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="col-span-3 flex flex-col gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Configuration
              </h2>
              <div className="flex flex-col gap-5">
                <ShapeSelector
                  shapeType={shapeType}
                  setShapeType={setShapeType}
                />
                <div className="border-t border-gray-100" />
                <DimensionPanel
                  shapeType={shapeType}
                  dimensions={dimensions}
                  setDimensions={setDimensions}
                />
                <div className="border-t border-gray-100" />
                <ShapeProperties
                  shapeType={shapeType}
                  dimensions={dimensions}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Save Shape
              </h2>
              <ShapeForm
                shapeName={shapeName}
                setShapeName={setShapeName}
                selectedShape={selectedShape}
                saveShape={saveShape}
                clearSelection={clearSelection}
                saving={saving}
              />
            </div>
          </div>

          {/* Middle Panel - Canvas */}
          <div className="col-span-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Preview
              </h2>
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl">
                <ShapeCanvas shapeType={shapeType} dimensions={dimensions} />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-full">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Saved Shapes
              </h2>
              <ShapeList
                shapes={shapes}
                loading={loading}
                loadShapeForEdit={loadShapeForEdit}
                deleteShape={deleteShape}
                selectedShape={selectedShape}
                deletingId={deletingId}
                editingId={editingId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
