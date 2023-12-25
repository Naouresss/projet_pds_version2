package com.projet.backend.services;

import com.projet.backend.config.JwtService;
import com.projet.backend.models.User;
import com.projet.backend.repo.UserCrud;
import com.projet.backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import com.projet.backend.services.NotFoundException;

@Service
@RequiredArgsConstructor
public class UserService implements UserCrud {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public boolean registerAUser(User user) throws Exception {
        if (user == null) {
            throw new Exception("User is null !");
        }
        user.setRole("ROLE_EMPLOYE");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setUnlocked(true);
        return userRepository.save(user) != null;
    }

    @Override
    public String login(User user) throws Exception {
        if (user == null) {
            throw new Exception("User is null !");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        var foundUser = userRepository.findByEmail(user.getEmail()).orElseThrow();
        return jwtService.generateToken(foundUser);
    }
    public List<User> getUsersWithRoleInvite() {
        return userRepository.getUsersWithRoleInvite();
    }
    @Override
    public boolean registerAnAdmin(User user) throws Exception {
        if (user == null) {
            throw new Exception("User is null !");
        }
        user.setRole("ROLE_ADMIN");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setUnlocked(true);
        return userRepository.save(user) != null;
    }
    @Override
    public boolean registerAnInvite(User user) throws Exception {
        if (user == null) {
            throw new Exception("User is null !");
        }
        user.setRole("ROLE_INVITE");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setUnlocked(true);
        return userRepository.save(user) != null;
    }

    @Override
    public List<User> loadAllUsers() {
        return userRepository.getAllUser();
    }

    @Override
    public User updateUser(UUID id,  User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            if (user.getNom() != null) {
                existingUser.setNom(user.getNom());
            }
            if (user.getPrenom() != null) {
                existingUser.setPrenom(user.getPrenom());
            }
            if (user.getEmail() != null) {
                existingUser.setEmail(user.getEmail());
            }
            if (user.getPassword() != null) {
                existingUser.setPassword(user.getPassword());
            }
            if (user.getRole() != null) {
                existingUser.setRole(user.getRole());
            }
            // Add other fields to update if needed

            return userRepository.save(existingUser);
        }
        return null; // or throw an exception if necessary
    }
    @Override
    public boolean deleteUser(UUID id) {
        userRepository.deleteById(id);
        return true;
    }
    public User getUser(UUID id) {
        return userRepository.findById(id).orElse(null);
    }
    // UserService.java

    public User updateUserStatus(UUID id, boolean newStatus) {
        System.out.println("Searching for user with ID: " + id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
        System.out.println("Found user: " + user);

        user.setUnlocked(newStatus);
        return userRepository.save(user);
    }

    public boolean isUserUnlocked(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        return user != null && user.isUnlocked();
    }



}



