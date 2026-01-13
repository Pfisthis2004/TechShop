package com.techmart.TechMart.auth.database;
import com.techmart.TechMart.auth.model.Role;
import com.techmart.TechMart.auth.model.User;
import com.techmart.TechMart.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class Database {
    @Bean
    CommandLineRunner init(UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            // kiểm tra theo email không phân biệt hoa/thường
            userRepo.findByEmailIgnoreCase("admin@techmart.com")
                    .ifPresentOrElse(
                            user -> {
                                System.out.println("ℹ️ Admin mặc định đã tồn tại: " + user.getEmail());
                            },
                            () -> {
                                User admin = new User();
                                admin.setUsername("admin");
                                admin.setEmail("admin@techmart.com");
                                admin.setPassword(encoder.encode("A123456a@"));
                                admin.setRole(Role.ADMIN);
                                admin.setActive(true);
                                admin.setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=Admin");
                                userRepo.save(admin);
                                System.out.println("✅ Admin mặc định đã được khởi tạo.");
                            }
                    );
        };
    }
}

