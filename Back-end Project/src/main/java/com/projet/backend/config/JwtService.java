package com.projet.backend.config;

import com.projet.backend.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
//La classe JwtService est un service qui fournit des fonctionnalités liées aux tokens JWT (JSON Web Token).
@Service
public class JwtService {
    //La constante SECRET_KEY est une clé secrète utilisée pour signer et vérifier les tokens JWT.
    private static final String SECRET_KEY = "357638792F423F4528482B4D6250655368566D597133743677397A2443264629";
    //extrait le nom d'utilisateur (sujet) à partir d'un token JWT en utilisant la
    // méthode générique extractClaim
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
//analyse le token JWT en utilisant la bibliothèque JWT pour extraire toutes les réclamations (claims) du token.
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
//La méthode generateMyClaims génère une HashMap de réclamations personnalisées (nom, prénom, rôle, email)
// à partir d'un objet User.
    private HashMap<String, Object> generateMyClaims(User user) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("nom", user.getNom());
        claims.put("prenom", user.getPrenom());
        claims.put("role", user.getRole());
        claims.put("email", user.getEmail());
        claims.put("password", user.getPassword());
        return claims;
    }

    public String generateToken(User userDetails) {
        return generateToken(generateMyClaims(userDetails), userDetails);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) == true && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
//génère un token JWT en utilisant les réclamations personnalisées générées par generateMyClaims et les détails de l'utilisateur (UserDetails).
// Le token généré est signé avec la clé secrète et a une durée de validité de 7 jours (1000 * 60 * 168).
    public String generateToken(Map<String, Object> claims, User userDetails) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                //.setSubject(userDetails.getUsername() + "|" + userDetails.getNom() + "|" + userDetails.getPrenom() + "|" + userDetails.getRole())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 168))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
//récupère la clé de signature utilisée pour signer et vérifier les tokens
// JWT en décodant la clé secrète en base64 et en la convertissant en une clé utilisée par la bibliothèque JWT.
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
