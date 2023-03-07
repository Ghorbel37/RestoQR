package com.pfe.restaurant.repository;

import com.pfe.restaurant.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
}