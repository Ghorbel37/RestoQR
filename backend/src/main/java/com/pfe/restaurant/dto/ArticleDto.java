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
    private String image;
    private SousCategorieDto sousCategorie;
}