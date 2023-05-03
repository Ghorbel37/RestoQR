package com.pfe.restaurant.dto;

import com.pfe.restaurant.entity.Article;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link Article} entity
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class ArticleDto implements Serializable {
    private Long idArticle;
    private String description;
    private String libelle;
    private BigDecimal prix;
    private String reference;
    private String duree;
    private String image;
    private CategorieDto categorie;

    /**
     * A DTO for the {@link com.example.raed.model.Categorie} entity
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CategorieDto implements Serializable {
        private Long idCategorie;
        private String nom;
    }
}