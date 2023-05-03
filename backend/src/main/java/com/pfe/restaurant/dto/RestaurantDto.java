package com.pfe.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.example.raed.model.Restaurant} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantDto implements Serializable {
    private String nomRestaurant;
    private String telephone;
    private String adresse;
    private String wifi;
    private String mdpWifi;
    private int nbrTables;
    private String logo;
}