package com.pfe.restaurant.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Zone implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idZone;
    private String nom;
    @OneToMany(mappedBy = "zone")
    @JsonIgnore
    private List<TableRestaurant> tables;

    //najem na3mel findTables by ZONE fel Controller of Tables
//    @OneToMany (mappedBy="zone")
//    private Collection<TableRestaurant> tableRestaurants;

}
