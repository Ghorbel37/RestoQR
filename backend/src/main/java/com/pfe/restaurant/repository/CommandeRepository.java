package com.pfe.restaurant.repository;

import com.pfe.restaurant.model.Commande;
import com.pfe.restaurant.model.Etat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    Commande findByTableRestaurant_IdTableAndEtat(Long idTable, Etat etat);
    List<Commande> findByDate(LocalDate date);
}