package com.pfe.restaurant.repository;

import com.pfe.restaurant.model.Client;
import com.pfe.restaurant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByUser(User user);
}