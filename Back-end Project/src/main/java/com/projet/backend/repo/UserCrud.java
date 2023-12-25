package com.projet.backend.repo;

import com.projet.backend.models.User;

import java.util.List;
import java.util.UUID;

public interface UserCrud {
    boolean registerAUser(User user) throws Exception;

    String login(User user) throws Exception;

    boolean registerAnAdmin(User user) throws Exception;
    boolean registerAnInvite(User user) throws Exception;
    List<User> getUsersWithRoleInvite();

    List<User> loadAllUsers() throws Exception;

   // boolean updateAUser(UUID id, User user) throws Exception;

    User updateUser(UUID id, User user);
    boolean deleteUser(UUID id);

    User getUser(UUID id);
}
