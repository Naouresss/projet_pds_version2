package com.projet.backend.controller;

import com.projet.backend.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface IUserController {
    ResponseEntity<?> registerAUser(User user) throws Exception;

    ResponseEntity<?> login(User user) throws Exception;

    ResponseEntity<?> registerAnAdmin(User user) throws Exception;
    ResponseEntity<?> registerAnInvite(User user) throws Exception;
    ResponseEntity<List<User>> getUsersWithRoleInvite() throws Exception;

    ResponseEntity<List<User>> loadAllUsers() throws Exception;

    ResponseEntity<?> updateAUser(UUID id, User user) throws Exception;

}
