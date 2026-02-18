package com.example.shapedesigner.exception;

import lombok.*;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private Map<String, String> errors;
}