package com.pfe.restaurant.dto;

import com.pfe.restaurant.entity.TableRestaurant;
import com.pfe.restaurant.entity.Zone;
import lombok.*;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link Zone} entity
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class ZoneDto implements Serializable {
    private Long idZone;
    private String nom;
    private List<TableRestaurantDto> tables;

}