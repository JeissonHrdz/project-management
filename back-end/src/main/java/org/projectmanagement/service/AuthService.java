package org.projectmanagement.service;

import org.projectmanagement.model.dto.auth.AuthResponseDto;
import org.projectmanagement.model.dto.user.UserLoginDto;

public interface AuthService {

    public AuthResponseDto login(UserLoginDto request);
}
