package com.pfe.restaurant.repository;

import com.pfe.restaurant.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}