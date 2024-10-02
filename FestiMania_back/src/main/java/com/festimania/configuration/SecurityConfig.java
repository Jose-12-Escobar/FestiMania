package com.festimania.configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Deshabilita CSRF (para evitar 403 en métodos POST/PUT/DELETE durante pruebas)
            .authorizeHttpRequests(authorize -> authorize
                .anyRequest().permitAll() // Permite todas las solicitudes sin autenticación
            );

        return http.build();
    }
}