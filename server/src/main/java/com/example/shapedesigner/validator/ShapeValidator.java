package com.example.shapedesigner.validator;

import com.example.shapedesigner.entity.ShapeType;
import org.springframework.stereotype.Component;
import java.util.Map;

@Component
public class ShapeValidator {

    public void validate(ShapeType type, Map<String, Object> dimensionData) {
        switch (type) {
            case RECTANGLE -> {
                extractPositiveDouble(dimensionData, "width", "Rectangle");
                extractPositiveDouble(dimensionData, "height", "Rectangle");
            }
            case CIRCLE -> {
                extractPositiveDouble(dimensionData, "radius", "Circle");
            }
            case TRIANGLE -> {
                extractPositiveDouble(dimensionData, "base", "Triangle");
                extractPositiveDouble(dimensionData, "height", "Triangle");
            }
        }
    }

    private void extractPositiveDouble(Map<String, Object> data, String key, String shapeName) {
        Object value = data.get(key);
        if (value == null) {
            throw new IllegalArgumentException(shapeName + " requires '" + key + "' in dimension data");
        }
        double parsed;
        try {
            parsed = Double.parseDouble(value.toString());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("'" + key + "' must be a valid number");
        }
        if (parsed <= 0) {
            throw new IllegalArgumentException("'" + key + "' must be greater than zero");
        }
    }
}