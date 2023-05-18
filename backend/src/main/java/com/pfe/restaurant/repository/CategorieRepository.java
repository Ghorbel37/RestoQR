package com.pfe.restaurant.repository;

import com.pfe.restaurant.model.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
    List<Categorie> findByActive(boolean active);
}