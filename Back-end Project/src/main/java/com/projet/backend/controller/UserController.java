package com.projet.backend.controller;

import com.projet.backend.models.User;
import com.projet.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/user")
@RequiredArgsConstructor
public class UserController implements IUserController {
    private final UserService userService;

    @PostMapping(path = "/register_user")
    @Override
    public ResponseEntity<?> registerAUser(@RequestBody User user) {
        try {
            boolean test = userService.registerAUser(user);
            if (test) {
                return new ResponseEntity<>(test, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(test, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exception) {
            //exception.printStackTrace();
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*@PostMapping(path = "/login")
    @Override
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            return new ResponseEntity<>(userService.login(user), HttpStatus.OK);

        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.FORBIDDEN);
        }
    }*/
    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            if (!userService.isUserUnlocked(user.getEmail())) {
                return new ResponseEntity<>("User account is locked.", HttpStatus.FORBIDDEN);
            }

            return new ResponseEntity<>(userService.login(user), HttpStatus.OK);

        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


    @PostMapping(path = "/register_admin")
    @Override
    public ResponseEntity<?> registerAnAdmin(@RequestBody User user) {
        try {
            boolean test = userService.registerAnAdmin(user);
            if (test) {
                return new ResponseEntity<>(test, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(test, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exception) {
            //exception.printStackTrace();
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(path = "/register_invite")
    @Override
    public ResponseEntity<?> registerAnInvite(@RequestBody User user) {
        try {
            boolean test = userService.registerAnInvite(user);
            if (test) {
                return new ResponseEntity<>(test, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(test, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception exception) {
            //exception.printStackTrace();
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(path = "/users")
    public ResponseEntity<List<User>> loadAllUsers() {
        try {
            return new ResponseEntity<>(userService.loadAllUsers(), HttpStatus.ACCEPTED);
        } catch (Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/update_user/{id}/")
    public ResponseEntity<?> updateAUser(@PathVariable("id") UUID id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public User getUser(@PathVariable UUID id) {
        return userService.getUser(id);
    }
    @Override
    @GetMapping("/invite-users")
    public ResponseEntity<List<User>> getUsersWithRoleInvite() throws Exception {
        List<User> usersWithRoleInvite = userService.getUsersWithRoleInvite();
        return ResponseEntity.ok(usersWithRoleInvite);
    }
    // UserController.java

    // UserController.java

    @PostMapping("/{id}/status")
    public ResponseEntity<User> updateUserStatus(
            @PathVariable UUID id,
            @RequestBody Map<String, Boolean> requestBody
    ) {
        boolean unlocked = requestBody.get("unlocked");
        User updatedUser = userService.updateUserStatus(id, unlocked);
        return ResponseEntity.ok(updatedUser);
    }


}
