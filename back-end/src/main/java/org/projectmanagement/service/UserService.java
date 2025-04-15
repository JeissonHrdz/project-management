package org.projectmanagement.service;

import org.projectmanagement.model.dto.user.UserRegisterDto;
import org.projectmanagement.model.dto.user.UserResponseDto;
import org.springframework.stereotype.Service;


public interface UserService {
    UserResponseDto registerUser(UserRegisterDto userRegisterDto);

    public Integer findUserId(String username);
}
