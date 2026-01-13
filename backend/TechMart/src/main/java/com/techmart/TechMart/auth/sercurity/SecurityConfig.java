package com.techmart.TechMart.auth.sercurity;

import com.techmart.TechMart.auth.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
    @Autowired private JwtAuthenticationFilter jwtFilter;
    @Autowired private UserDetailsServiceImpl userDetailsService;

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable())
//                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth -> auth
//                        // Public
//                        .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/v1/categories/**").permitAll()
//
//                        // User
//                        .requestMatchers("/api/v1/orders/**").hasRole("USER")
//                        .requestMatchers("/api/v1/users/**").hasRole("USER")
//
//                        // Admin
//                        .requestMatchers("/api/v1/products/**").hasRole("ADMIN")
//                        .requestMatchers("/api/v1/categories/**").hasRole("ADMIN")
//                        .requestMatchers("/api/v1/orders/all").hasRole("ADMIN")
//
//                        // Auth
//                        .requestMatchers("/api/v1/auth/**").permitAll()
//
//                        // Default
//                        .anyRequest().authenticated()
//                )
//                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // AUTH
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // PUBLIC APIs (KHÔNG CẦN LOGIN)
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/products/**",
                                "/api/v1/categories/**",
                                "/api/v1/promotions/**"
                        ).permitAll()

                        // USER
                        .requestMatchers("/api/v1/orders/**").hasAnyRole("USER", "ADMIN")

                        // ADMIN
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")

                        // CÒN LẠI
                        .anyRequest().authenticated()
                )

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(10); }
}
