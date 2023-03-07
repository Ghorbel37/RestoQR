package com.pfe.restaurant.repository;

import com.pfe.restaurant.entity.Facture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactureRepository extends JpaRepository<Facture, Long> {
}