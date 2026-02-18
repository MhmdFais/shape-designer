package com.example.shapedesigner.service;

import com.example.shapedesigner.dto.ShapeRequestDTO;
import com.example.shapedesigner.dto.ShapeResponseDTO;
import com.example.shapedesigner.entity.Shape;
import com.example.shapedesigner.repository.ShapeRepository;
import com.example.shapedesigner.validator.ShapeValidator;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShapeService {

    private final ShapeRepository shapeRepository;
    private final ObjectMapper objectMapper;
    private final ShapeValidator shapeValidator;

    public ShapeResponseDTO createShape(ShapeRequestDTO request) {
        try {
            shapeValidator.validate(request.getType(), request.getDimensionData());

            String dimensionJson = objectMapper.writeValueAsString(request.getDimensionData());

            Shape shape = Shape.builder()
                    .name(request.getName())
                    .type(request.getType())
                    .dimensionData(dimensionJson)
                    .build();

            return toDTO(shapeRepository.save(shape));

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize dimension data", e);
        }
    }

    public List<ShapeResponseDTO> getAllShapes() {
        return shapeRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ShapeResponseDTO getShapeById(Long id) {
        Shape shape = shapeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shape not found with id: " + id));
        return toDTO(shape);
    }

    public ShapeResponseDTO updateShape(Long id, ShapeRequestDTO request) {
        try {
            shapeValidator.validate(request.getType(), request.getDimensionData());

            Shape shape = shapeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Shape not found with id: " + id));

            String dimensionJson = objectMapper.writeValueAsString(request.getDimensionData());

            shape.setName(request.getName());
            shape.setType(request.getType());
            shape.setDimensionData(dimensionJson);

            return toDTO(shapeRepository.save(shape));

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize dimension data", e);
        }
    }

    public void deleteShape(Long id) {
        if (!shapeRepository.existsById(id)) {
            throw new RuntimeException("Shape not found with id: " + id);
        }
        shapeRepository.deleteById(id);
    }

    private ShapeResponseDTO toDTO(Shape shape) {
        try {
            Map<String, Object> dimensionMap = objectMapper.readValue(
                    shape.getDimensionData(),
                    new TypeReference<Map<String, Object>>() {}
            );

            return ShapeResponseDTO.builder()
                    .id(shape.getId())
                    .name(shape.getName())
                    .type(shape.getType())
                    .dimensionData(dimensionMap)
                    .createdAt(shape.getCreatedAt())
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Failed to deserialize dimension data for shape id: " + shape.getId(), e);
        }
    }
}
