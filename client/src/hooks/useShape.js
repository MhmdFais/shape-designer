import { useState, useEffect } from "react";
import { shapeService } from "../services/shapeService";

export function useShape() {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapeType, setShapeType] = useState("RECTANGLE");
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const [shapeName, setShapeName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShapes();
  }, []);

  // when shape type changes, reset dimensions to defaults
  useEffect(() => {
    if (shapeType === "RECTANGLE") setDimensions({ width: 100, height: 100 });
    if (shapeType === "CIRCLE") setDimensions({ radius: 50 });
    if (shapeType === "TRIANGLE") setDimensions({ base: 100, height: 80 });
  }, [shapeType]);

  async function fetchShapes() {
    try {
      setLoading(true);
      const data = await shapeService.getAllShapes();
      setShapes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveShape() {
    try {
      setError(null);
      const payload = {
        name: shapeName,
        type: shapeType,
        dimensionData: dimensions,
      };
      if (selectedShape) {
        await shapeService.updateShape(selectedShape.id, payload);
      } else {
        await shapeService.createShape(payload);
      }
      setShapeName("");
      setSelectedShape(null);
      await fetchShapes();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteShape(id) {
    try {
      setError(null);
      await shapeService.deleteShape(id);
      await fetchShapes();
    } catch (err) {
      setError(err.message);
    }
  }

  function loadShapeForEdit(shape) {
    setSelectedShape(shape);
    setShapeType(shape.type);
    setDimensions(shape.dimensionData);
    setShapeName(shape.name);
  }

  function clearSelection() {
    setSelectedShape(null);
    setShapeName("");
    setShapeType("RECTANGLE");
    setDimensions({ width: 100, height: 100 });
  }

  return {
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
  };
}
