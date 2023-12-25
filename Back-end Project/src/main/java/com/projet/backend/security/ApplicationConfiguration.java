package com.projet.backend.security;

import com.projet.backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
//Cette classe est utilisée pour définir et configurer différents éléments
// liés à l'authentification et à la sécurité de l'application.
@Configuration
@RequiredArgsConstructor
public class ApplicationConfiguration {
    private final UserRepository userRepository;
//Cette méthode retourne une instance de UserDetailsService. Elle utilise le UserRepository pour rechercher
// un utilisateur par son nom d'utilisateur (dans ce cas, l'adresse e-mail).
// Si aucun utilisateur correspondant n'est trouvé, une exception est levée.
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found !"));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
// Cette méthode retourne une instance de AuthenticationProvider.
// Elle utilise le UserDetailsService et le PasswordEncoder pour configurer un DaoAuthenticationProvider,
// qui est un AuthenticationProvider basé sur
// les données d'un utilisateur stockées dans un UserDetailsService.
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
//Lorsqu'une méthode est annotée avec @Bean, Spring enregistre le résultat de cette méthode en tant
// que bean dans le contexte de l'application.
// Par la suite, le bean peut être injecté dans d'autres composants et utilisé dans l'application