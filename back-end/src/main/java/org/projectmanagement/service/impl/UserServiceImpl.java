package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.user.UserRegisterDto;
import org.projectmanagement.model.dto.user.UserResponseDto;
import org.projectmanagement.model.entity.User;
import org.projectmanagement.repository.UserRepository;
import org.projectmanagement.service.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponseDto registerUser(UserRegisterDto userRegisterDto) {
        User user = User.builder()
                .username(userRegisterDto.username())
                .email(userRegisterDto.email())
                .password_hash(userRegisterDto.password())
                .first_name(userRegisterDto.firstName())
                .last_name(userRegisterDto.lastName())
                .role_id(1).build();
        User savedUser = userRepository.save(user);

        return new UserResponseDto(
                savedUser.getUser_id(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getFirst_name(),
                savedUser.getLast_name(),
                savedUser.getRole_id().toString(),
                savedUser.getCreated_at()
        );


    }
}
