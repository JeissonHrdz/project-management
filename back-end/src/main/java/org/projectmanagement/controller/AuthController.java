package org.projectmanagement.controller;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.user.UserRegisterDto;
import org.projectmanagement.model.dto.user.UserResponseDto;
import org.projectmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @GetMapping("/prueba")
    public String prueba() {
        return "PRUEBA DE AUTENTICACION";
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> registerUser(@RequestBody UserRegisterDto userRegisterDto) {
            UserResponseDto createdUser = userService.registerUser(userRegisterDto);
            return ResponseEntity.created(URI.create("/auth/register")).body(createdUser);
    }

}
