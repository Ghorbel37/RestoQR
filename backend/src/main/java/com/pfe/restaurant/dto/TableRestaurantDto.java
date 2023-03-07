package com.pfe.restaurant.dto;

import com.pfe.restaurant.entity.TableRestaurant;
import com.pfe.restaurant.entity.Zone;
import lombok.*;

import java.io.Serializable;

/**
 * A DTO for the {@link TableRestaurant} entity
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class TableRestaurantDto implements Serializable {
    private Long idTableRestaurant;
    private int numero;
    private ZoneDto zone;
}