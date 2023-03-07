package com.pfe.restaurant.dto;

import com.pfe.restaurant.entity.Categorie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link Categorie} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategorieDto implements Serializable {
    private Long idCategorie;
    private String nom;
    private List<SousCategorieDto> sousCategories;
}