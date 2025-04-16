package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.auth.AuthResponseDto;
import org.projectmanagement.model.dto.user.UserLoginDto;
import org.projectmanagement.repository.UserRepository;
import org.projectmanagement.service.AuthService;
import org.projectmanagement.service.JwtService;
import org.projectmanagement.service.RoleService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleService roleService;
    private final UserRepository userRepository;

    @Override
    public AuthResponseDto login(UserLoginDto request) {

        System.out.println(request.password() );
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        UserDetails user =  userRepository.findByUsername(request.username()).orElseThrow();
        String token = jwtService.getToken(user);
        System.out.println("token: " + token);


        return  AuthResponseDto.builder()
                .token(token)
                .build();
    }
}
