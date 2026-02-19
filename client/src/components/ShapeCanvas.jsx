import { useEffect, useRef } from "react";

function ShapeCanvas({ shapeType, dimensions }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#3B82F6";
    ctx.strokeStyle = "#1D4ED8";
    ctx.lineWidth = 2;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    switch (shapeType) {
      case "RECTANGLE": {
        const { width, height } = dimensions;
        ctx.beginPath();
        ctx.roundRect(cx - width / 2, cy - height / 2, width, height, 8);
        ctx.fill();
        ctx.stroke();
        break;
      }
      case "CIRCLE": {
        const { radius } = dimensions;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
      }
      case "TRIANGLE": {
        const { base, height } = dimensions;
        ctx.beginPath();
        ctx.moveTo(cx, cy - height / 2);
        ctx.lineTo(cx + base / 2, cy + height / 2);
        ctx.lineTo(cx - base / 2, cy + height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
      default:
        break;
    }
  }, [shapeType, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={500}
      className="w-full h-full"
    />
  );
}

export default ShapeCanvas;
