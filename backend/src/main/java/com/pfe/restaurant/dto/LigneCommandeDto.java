package com.pfe.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link com.pfe.restaurant.model.LigneCommande} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LigneCommandeDto implements Serializable {
    private Long idLigneCommande;
    private BigDecimal prixLigne;
    private int quantite;
    private ArticleDto article;
}