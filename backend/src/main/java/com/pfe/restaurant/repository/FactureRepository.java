package com.pfe.restaurant.repository;

import com.pfe.restaurant.model.Facture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactureRepository extends JpaRepository<Facture, Long> {
}