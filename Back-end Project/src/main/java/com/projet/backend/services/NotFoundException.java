package com.projet.backend.services;

// NotFoundException.java

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}
