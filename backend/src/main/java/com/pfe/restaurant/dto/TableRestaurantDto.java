package com.pfe.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.pfe.restaurant.model.TableRestaurant} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TableRestaurantDto implements Serializable {
    private Long idTable;
    private int numero;
}