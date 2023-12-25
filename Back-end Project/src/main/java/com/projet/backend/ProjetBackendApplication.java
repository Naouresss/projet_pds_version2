package com.projet.backend;

import com.projet.backend.repo.UserRepository;
import com.projet.backend.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProjetBackendApplication {
    //TODO Create unit tests for each controller
    public static void main(String[] args) {
        SpringApplication.run(ProjetBackendApplication.class, args);
    }


}
