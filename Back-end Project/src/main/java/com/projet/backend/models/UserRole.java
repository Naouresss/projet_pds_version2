package com.projet.backend.user;

import lombok.Getter;

@Getter
public enum UserRole {
    EMPLOYE_ROLE("EMPLOYE"),
    ADMIN_ROLE("ADMIN"),
    CHEF_ROLE("CHEF"),
    ASSISTANT_ROLE("ASSISTANT"),
    MEMBRE_ROLE("MEMBRE"),
    INVITE_ROLE("INVITE");

    private String permission;

    UserRole(String p) {
        this.permission = p;
    }
}
