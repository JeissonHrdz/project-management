package org.projectmanagement.service;

import org.projectmanagement.model.dto.auth.AuthResponseDto;
import org.projectmanagement.model.dto.user.UserLoginDto;

import java.nio.file.AccessDeniedException;

public interface AuthService {

    public AuthResponseDto login(UserLoginDto request) throws AccessDeniedException;
}
