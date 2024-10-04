package com.festimania.bo.impl;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.festimania.documentos.Users;
import com.festimania.dto.AuthResponse;
import com.festimania.dto.LoginDto;
import com.festimania.dto.SignUpDto;
import com.festimania.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final static String ADMIN = "ROLE_ADMIN";
	private final static String USER = "ROLE_USER";
	
    private final UsersRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginDto request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsernameOrEmail(), request.getPassword()));
        UserDetails user=userRepository.findByUserNameOrEmail(request.getUsernameOrEmail(),request.getUsernameOrEmail()).orElseThrow();
               
        Optional<Users> oUser = userRepository.findByUserNameOrEmail(user.getUsername(),user.getUsername());
        
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
        		.username(oUser.get().getUsername())
        		.email(oUser.get().getEmail())
        		.name(oUser.get().getName())
        		.lastname(oUser.get().getLastName())
        		.roles(oUser.get().getRoles())
	            .token(token)
	            .build();

    }

    public AuthResponse register(SignUpDto signUpDto) {
    	
    	//Comentar esta linea sino queremos dar de alta roles ADMIN y asignar USER más abajo
    	String rol = userRepository.existsByRoles(ADMIN) ? USER : ADMIN;

        Users user = Users.builder()
                .userName(signUpDto.getUsername())
                .password(passwordEncoder.encode( signUpDto.getPassword()))
                .name(signUpDto.getName())
                .lastName(signUpDto.getLastname())
                .email(signUpDto.getEmail())
                .roles(rol)
                .build();        

        userRepository.save(user);
        
        return AuthResponse.builder()
        		.username(user.getUsername())
        		.email(user.getEmail())
        		.name(user.getName())
        		.lastname(user.getLastName())
        		.roles(user.getRoles())
           .token(jwtService.getToken(user))
            .build();
        
    }

}