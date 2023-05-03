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
public class LigneCommande implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idLigneCommande;
    private BigDecimal prixLigne;
    private int quantite;
    @ManyToOne
    private Article article;
}
