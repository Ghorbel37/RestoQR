package com.pfe.restaurant.repository;

import com.pfe.restaurant.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    List<Commande> findByDate(LocalDate date);
}