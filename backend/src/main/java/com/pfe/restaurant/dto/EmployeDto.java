package com.pfe.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.pfe.restaurant.model.Employe} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeDto implements Serializable {
    private Long idEmploye;
    private String nom;
    private UserDto user;
}