package com.pfe.restaurant.repository;

import com.pfe.restaurant.model.TableRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TableRestaurantRepository extends JpaRepository<TableRestaurant, Long> {
    Optional<TableRestaurant> findByNumero(int numero);
}