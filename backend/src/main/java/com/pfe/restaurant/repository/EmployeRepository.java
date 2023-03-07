package com.pfe.restaurant.repository;

import com.pfe.restaurant.entity.Employe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeRepository extends JpaRepository<Employe, Long> {
}