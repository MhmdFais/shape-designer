package com.example.shapedesigner.dto;

import com.example.shapedesigner.entity.ShapeType;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShapeResponseDTO {
    private Long id;
    private String name;
    private ShapeType type;
    private Map<String, Object> dimensionData;
    private LocalDateTime createdAt;
}