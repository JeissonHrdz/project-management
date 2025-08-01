package org.projectmanagement.service;

import org.projectmanagement.model.dto.user.UserReadDto;
import org.projectmanagement.model.dto.user.UserRegisterDto;
import org.projectmanagement.model.dto.user.UserResponseDto;
import org.projectmanagement.model.entity.User;

import java.util.List;


public interface UserService {
    UserResponseDto registerUser(UserRegisterDto userRegisterDto);

    public User findUser(String username);
    public String findUserId(String username);
    List<UserReadDto> findAllUsersAssignedTasks(Integer task_id);
    List<String> findUserEmail(String email);
}
