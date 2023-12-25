package com.projet.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import com.projet.backend.user.CustomAuthoritiesDeserializer;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Table(name="employe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nom;
    private String prenom;
    @Column(nullable = false, unique = true)
    private String email;
    //@JsonIgnore
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String role;
    @Column(nullable = false)
    private boolean unlocked;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<MeetingParticipant> meetingParticipants = new HashSet<>();


    public User(@JsonProperty("id") UUID id, @JsonProperty("nom") String nom, @JsonProperty("prenom") String prenom, @JsonProperty("email") String email, @JsonProperty("password") String password, @JsonProperty("role") String role, @JsonProperty("unlocked") boolean unlocked,String uRole, Object o) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.role = role;
        this.password = password;
        this.unlocked = unlocked;
    }
    public User(String id, String nom, String prenom, String email, String password, String role, boolean unlocked) {
        this.id = UUID.fromString(id);
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.role = role;
        this.unlocked = unlocked;
    }

    @JsonDeserialize(using = CustomAuthoritiesDeserializer.class)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
