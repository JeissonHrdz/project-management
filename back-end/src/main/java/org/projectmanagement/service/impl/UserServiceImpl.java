package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.task_assignment.TaskAssignmentResponseDto;
import org.projectmanagement.model.dto.user.UserReadDto;
import org.projectmanagement.model.dto.user.UserRegisterDto;
import org.projectmanagement.model.dto.user.UserResponseDto;
import org.projectmanagement.model.entity.User;
import org.projectmanagement.repository.RoleRepository;
import org.projectmanagement.repository.UserRepository;
import org.projectmanagement.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final TaskAssignmentServiceImpl taskAssignmentService;
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

    @Override
    public List<UserReadDto> findAllUsersAssignedTasks(Integer task_id) {
      List<TaskAssignmentResponseDto> taskAssignments = taskAssignmentService.geTaskAssignmentsByTaskId(task_id);
      List<User> users = new ArrayList<>();

       for (TaskAssignmentResponseDto taskAssignment : taskAssignments) {
        users.add(userRepository.findById(taskAssignment.user_id()).get());
          }

    List<UserReadDto> userReadDtos = users.stream()
            .map(user -> new UserReadDto(
                    user.getUser_id(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getFirst_name(),
                    user.getLast_name(),
                    user.getRole_id().getRole_id(),
                    user.getIs_scrum_master(),
                    user.getIs_product_owner()
            )).collect(Collectors.toList());

    return userReadDtos;

    }

    @Override
    public List<String> findUserEmail(String email) {
        return userRepository.findEmail(email);
    }
}
