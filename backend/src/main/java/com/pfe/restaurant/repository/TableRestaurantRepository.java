package com.pfe.restaurant.repository;

import com.pfe.restaurant.entity.TableRestaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRestaurantRepository extends JpaRepository<TableRestaurant, Long> {
}