package com.projet.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
//cette classe  est responsable de la gestion de l'authentification JSON Web Token (JWT)
//@Component ce qui indique qu'il s'agit d'un composant Spring qui sera automatiquement
// détecté et enregistré dans le contexte de l'application.
@Component
//génère un constructeur avec les arguments requis pour la classe JwtAuthFilter
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    //en injectant les dépendances JwtService et UserDetailsService via l'injection de constructeur.
    //crée une variable jwtService constante et privée qui est utilisée pour accéder à l'objet
    // JwtService nécessaire pour effectuer des opérations liées aux jetons JWT dans la classe JwtAuthFilter.
    //L'utilisation du modificateur final garantit que la variable jwtService est immuable,
    // c'est-à-dire qu'elle ne peut pas être réassignée après son initialisation.
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
//Ce filtre est généralement configuré dans la configuration de sécurité de l'application pour s'assurer
// qu'il est appliqué aux points de terminaison appropriés pour l'authentification et l'autorisation JWT.
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader(AUTHORIZATION);
        final String jwt;
        final String userEmail;
// Si l'en-tête est nul ou ne commence pas par le schéma "Bearer",
// cela signifie que la requête ne contient pas de JWT (JSON Web Token) pour l'authentification
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        //Si l'en-tête d'autorisation est présent et commence par "Bearer", le code extrait le JWT de l'en-tête
        // en supprimant le préfixe "Bearer" (7 caractères).
        // Il utilise ensuite un jwtServicepour extraire l'e-mail de l'utilisateur du JWT.
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}
//Si l'e-mail de l'utilisateur est extrait avec succès du JWT et qu'il n'y a pas d'authentification existante
// dans le SecurityContextHolder, le code charge les détails de l'utilisateur (par exemple, les rôles,
// les autorisations) à partir du userDetailsServicesur la base de l'e-mail extrait.
//Il valide ensuite le JWT à l'aide de la jwtService.isTokenValidméthode,
// en transmettant le JWT et les détails de l'utilisateur. Si le jeton est valide,
// il crée un nouvel UsernamePasswordAuthenticationTokenobjet avec les détails de l'utilisateur,
// pas d'informations d'identification (mot de passe) et les autorités.
