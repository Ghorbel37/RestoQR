package com.pfe.restaurant.dto;

import com.pfe.restaurant.model.Etat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Collection;

/**
 * A DTO for the {@link com.pfe.restaurant.model.Commande} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommandeDto implements Serializable {
    private Long idCommande;
    private LocalDate date;
    private Etat etat;
    private Collection<LigneCommandeDto> ligneCommandes;
    private ClientDto client;
    private TableRestaurantDto tableRestaurant;
}