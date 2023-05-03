package com.pfe.restaurant.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Article implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idArticle;
    private String description;
    private String libelle;
    private BigDecimal prix;
    private String reference;
    private String duree;
    @Lob
    private String image;
    @ManyToOne
    private Categorie categorie;
}
