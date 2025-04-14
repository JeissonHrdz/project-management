package org.projectmanagement.model.dto.user;

public record UserLoginDto(
    String username,
    String password
) {
}
