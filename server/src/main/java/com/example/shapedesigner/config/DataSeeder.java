package com.example.shapedesigner.config;

import com.example.shapedesigner.entity.Shape;
import com.example.shapedesigner.entity.ShapeType;
import com.example.shapedesigner.repository.ShapeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ShapeRepository shapeRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        if (shapeRepository.count() == 0) {
            log.info("No shapes found, seeding default shapes");
            seedShapes();
            log.info("Default shapes seeded successfully");
        } else {
            log.info("Shapes already exist, skipping seed");
        }
    }

    private void seedShapes() throws Exception {

        // Rectangle (100x100)
        Shape rectangle = Shape.builder()
                .name("Default Rectangle")
                .type(ShapeType.RECTANGLE)
                .dimensionData(objectMapper.writeValueAsString(
                        Map.of("width", 100, "height", 100)
                ))
                .build();

        // Circle (radius 50)
        Shape circle = Shape.builder()
                .name("Default Circle")
                .type(ShapeType.CIRCLE)
                .dimensionData(objectMapper.writeValueAsString(
                        Map.of("radius", 50)
                ))
                .build();

        // Triangle (base 100, height 80)
        Shape triangle = Shape.builder()
                .name("Default Triangle")
                .type(ShapeType.TRIANGLE)
                .dimensionData(objectMapper.writeValueAsString(
                        Map.of("base", 100, "height", 80)
                ))
                .build();

        shapeRepository.save(rectangle);
        shapeRepository.save(circle);
        shapeRepository.save(triangle);
    }
}
