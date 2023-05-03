package com.pfe.restaurant.repository;

import com.pfe.restaurant.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
}