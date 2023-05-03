package com.pfe.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A DTO for the {@link com.pfe.restaurant.model.Client} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto implements Serializable {
    private Long idClient;
    private String firstname;
    private String lastname;
    private LocalDate dateNais;
    private String numero;
    private UserDto user;
}