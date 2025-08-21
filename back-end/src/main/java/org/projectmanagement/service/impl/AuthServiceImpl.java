package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.auth.AuthResponseDto;
import org.projectmanagement.model.dto.user.UserLoginDto;
import org.projectmanagement.repository.UserRepository;
import org.projectmanagement.service.AuthService;
import org.projectmanagement.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
   // private final RoleService roleService;
    private final UserRepository userRepository;
  //  private final UserService userService;

    @Override
    public AuthResponseDto login(UserLoginDto request) throws AccessDeniedException {

        System.out.println(request.password() );
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        UserDetails user =  userRepository.findByUsername(request.username()).orElseThrow();
        Integer role = userRepository.findByUsername(request.username()).orElseThrow().getRole_id().getRole_id();
        String user_id =  userRepository.findByUsername(request.username()).orElseThrow().getUser_id();
        String token = jwtService.getToken(user, user_id,role);
        System.out.println("token: " + token);
       // User user1 = userService.findUser(jwtService.getUserNameFromToken(token));
        return  AuthResponseDto.builder()
                .token(token)
                .build();
    }
}
