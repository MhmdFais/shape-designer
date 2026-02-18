package com.example.shapedesigner.dto;

import com.example.shapedesigner.entity.ShapeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShapeRequestDTO {

    @NotBlank(message = "Shape name cannot be empty")
    @Size(max = 30, message = "Shape name cannot exceed 30 characters")
    private String name;

    @NotNull(message = "Shape type cannot be null")
    private ShapeType type;

    @NotNull(message = "Dimension data cannot be null")
    private Map<String, Object> dimensionData;
}