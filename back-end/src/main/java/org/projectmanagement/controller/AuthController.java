package org.projectmanagement.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@CrossOrigin(origins = {"http://localhost:4200"})
@Tag(name = "Authentication")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @Operation(summary = "Register a new user")
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

    @Operation(summary = "Login a user")
    @PostMapping(value ="login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDto request) throws AccessDeniedException {
        System.out.println(request);
        try{
            AuthResponseDto authResponseDto = authService.login(request);
            return new ResponseEntity<>(authResponseDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(), HttpStatus.BAD_REQUEST);
        }
    }

}
