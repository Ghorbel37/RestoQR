package com.pfe.restaurant.repository;

import com.pfe.restaurant.model.Role;
import com.pfe.restaurant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    long countByRole(Role role);
    Optional<User> findByEmail(String email);
}