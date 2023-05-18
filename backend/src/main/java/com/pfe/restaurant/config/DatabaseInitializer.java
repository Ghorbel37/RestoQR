package com.pfe.restaurant.config;

import com.pfe.restaurant.model.Client;
import com.pfe.restaurant.model.Restaurant;
import com.pfe.restaurant.model.Role;
import com.pfe.restaurant.model.User;
import com.pfe.restaurant.repository.ClientRepository;
import com.pfe.restaurant.repository.RestaurantRepository;
import com.pfe.restaurant.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@AllArgsConstructor
public class DatabaseInitializer {
    private final ClientRepository clientRepository;
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder ;



    @PostConstruct
    public void init() {
        if (clientRepository.count() == 0) {
            Client clientPassager = new Client();
            clientPassager.setId(1L);
            clientPassager.setFirstname("Passager");
            clientRepository.save(clientPassager);
        }
        if (restaurantRepository.count() == 0) {
            Restaurant restaurant=new Restaurant();
            restaurant.setIdRestaurant(1L);
            restaurant.setNomRestaurant("Restaurant");
            restaurant.setNbrTables(1);
            restaurantRepository.save(restaurant);
        }

        if(userRepository.countByRole(Role.valueOf("ADMIN"))==0) {
            User admin = new User();
            admin.setEmail("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }
    }
}
