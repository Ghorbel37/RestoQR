package com.pfe.restaurant.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Commande implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCommande;
    private LocalDate date;
    private Etat etat;
    @OneToMany(cascade = CascadeType.DETACH,orphanRemoval = true)
    private Collection<LigneCommande> ligneCommandes;
    @ManyToOne
    private Client client;
    @ManyToOne
    private TableRestaurant tableRestaurant;

}
