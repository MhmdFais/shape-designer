import { useState, useEffect, useRef } from "react";
import { shapeService } from "../services/shapeService";

export function useShape() {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapeType, setShapeType] = useState("RECTANGLE");
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const [shapeName, setShapeName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const isLoadingEdit = useRef(false);

  useEffect(() => {
    fetchShapes();
  }, []);

  useEffect(() => {
    if (isLoadingEdit.current) {
      isLoadingEdit.current = false;
      return;
    }
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
      setSaving(true);
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
    } finally {
      setSaving(false);
    }
  }

  async function deleteShape(id) {
    try {
      setDeletingId(id);
      setError(null);
      await shapeService.deleteShape(id);
      await fetchShapes();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  async function loadShapeForEdit(shape) {
    setEditingId(shape.id);
    isLoadingEdit.current = true;
    setSelectedShape(shape);
    setShapeType(shape.type);
    setDimensions(shape.dimensionData);
    setShapeName(shape.name);
    setEditingId(null);
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
    saving,
    deletingId,
    editingId,
    saveShape,
    deleteShape,
    loadShapeForEdit,
    clearSelection,
  };
}
