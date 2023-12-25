package com.projet.backend.repo;

import com.projet.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    @Query("select u from User u  where u.role=:role")
    List<User> getAllUserGroupedByRole(String role);
    @Query("select u from User u")
    List<User> getAllUser();
    @Query("select u from User u where u.role = 'ROLE_INVITE'")
    List<User> getUsersWithRoleInvite();
}
