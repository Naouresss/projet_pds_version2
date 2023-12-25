package com.projet.backend.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//Le CORS (Cross-Origin Resource Sharing) est un mécanisme de sécurité utilisé par
// les navigateurs web pour contrôler l'accès aux ressources entre différents domaines (origines)
@Configuration
public class CorsConfiguration  implements WebMvcConfigurer {
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        WebMvcConfigurer.super.configurePathMatch(configurer);
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.defaultContentType(MediaType.ALL);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //WebMvcConfigurer.super.addCorsMappings(registry);
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .maxAge(36001)
                .allowCredentials(true);
    }
}
//L'annotation @Override est utilisée en Java pour indiquer qu'une méthode dans une
// classe dérive d'une méthode de sa classe parente (superclasse) et qu'elle la remplace (override).