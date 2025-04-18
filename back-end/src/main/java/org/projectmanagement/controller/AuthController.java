package org.projectmanagement.controller;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.auth.AuthResponseDto;
import org.projectmanagement.model.dto.user.UserLoginDto;
import org.projectmanagement.model.dto.user.UserRegisterDto;
import org.projectmanagement.model.dto.user.UserResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.AuthService;
import org.projectmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterDto userRegisterDto) {
            UserResponseDto createdUser = userService.registerUser(userRegisterDto);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("User registered successfully")
                    .object(createdUser)
                    .build(),
                    HttpStatus.CREATED
            );
    }

    @PostMapping(value ="login")
    public ResponseEntity<AuthResponseDto> loginUser(@RequestBody UserLoginDto request) throws AccessDeniedException {
        System.out.println(request);
      return ResponseEntity.ok(authService.login(request));
    }

}
