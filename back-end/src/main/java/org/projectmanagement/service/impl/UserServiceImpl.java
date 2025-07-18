package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.user.UserRegisterDto;
import org.projectmanagement.model.dto.user.UserResponseDto;
import org.projectmanagement.model.entity.User;
import org.projectmanagement.repository.RoleRepository;
import org.projectmanagement.repository.UserRepository;
import org.projectmanagement.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserResponseDto registerUser(UserRegisterDto userRegisterDto) {

        User user = User.builder()
                .user_id(UUID.randomUUID().toString())
                .username(userRegisterDto.username())
                .email(userRegisterDto.email())
                .password_hash(passwordEncoder.encode(userRegisterDto.password_hash()))
                .first_name(userRegisterDto.first_name())
                .last_name(userRegisterDto.last_name())
                .role_id(roleRepository.findById(1).orElseThrow()).build();
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

    @Override
    public User findUser(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public String findUserId(String username) {
        return "";
    }
}
