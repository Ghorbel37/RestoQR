package com.pfe.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * A DTO for the {@link com.pfe.restaurant.model.Facture} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FactureDto implements Serializable {
    private Long idFacture;
    private LocalDate dateFacture;
    private BigDecimal montantTotale;
    private BigDecimal TVA;
    private CommandeDto commande;
    private EmployeDto employe;
}