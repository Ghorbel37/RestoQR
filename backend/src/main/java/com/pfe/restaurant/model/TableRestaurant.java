package com.pfe.restaurant.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class TableRestaurant implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idTable;
    private int numero;
    @JsonIgnore
    @ManyToOne
    private Zone zone;

}
