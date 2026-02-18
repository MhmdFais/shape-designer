package com.example.shapedesigner.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shapes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private ShapeType type;

    @Column(columnDefinition = "JSON")
    private String dimensionData;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
