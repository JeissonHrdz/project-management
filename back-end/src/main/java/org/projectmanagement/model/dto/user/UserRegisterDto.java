package org.projectmanagement.model.dto.user;

import lombok.Data;

public record UserRegisterDto (
        String user_id,
        String username,
        String email,
        String password_hash,
        String first_name,
        String last_name
){}

