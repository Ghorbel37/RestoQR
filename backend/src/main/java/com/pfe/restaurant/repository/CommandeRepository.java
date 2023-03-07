package com.pfe.restaurant.repository;

import com.pfe.restaurant.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
}