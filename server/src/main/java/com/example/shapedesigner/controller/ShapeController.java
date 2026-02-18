package com.example.shapedesigner.controller;

import com.example.shapedesigner.dto.ShapeRequestDTO;
import com.example.shapedesigner.dto.ShapeResponseDTO;
import com.example.shapedesigner.service.ShapeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shapes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ShapeController {

    private final ShapeService shapeService;

    @PostMapping
    public ResponseEntity<ShapeResponseDTO> createShape(@Valid @RequestBody ShapeRequestDTO request) {
        ShapeResponseDTO response = shapeService.createShape(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ShapeResponseDTO>> getAllShapes() {
        return ResponseEntity.ok(shapeService.getAllShapes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShapeResponseDTO> getShapeById(@PathVariable Long id) {
        return ResponseEntity.ok(shapeService.getShapeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShapeResponseDTO> updateShape(
            @PathVariable Long id,
            @Valid @RequestBody ShapeRequestDTO request) {
        return ResponseEntity.ok(shapeService.updateShape(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShape(@PathVariable Long id) {
        shapeService.deleteShape(id);
        return ResponseEntity.noContent().build();
    }
}
