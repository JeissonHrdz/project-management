package org.projectmanagement.model.dto.user;

import java.sql.Timestamp;

public record UserResponseDto(
        Integer user_id,
        String username,
        String email,
        String first_name,
        String last_name,
        String role,
        Timestamp created_at
) {
}
