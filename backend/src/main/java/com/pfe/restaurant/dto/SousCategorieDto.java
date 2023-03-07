package com.pfe.restaurant.dto;

import com.pfe.restaurant.entity.SousCategorie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link SousCategorie} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SousCategorieDto implements Serializable {
    private Long idSousCategorie;
    private String nom;
}