package com.pfe.restaurant.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Restaurant implements Serializable {
    @Id
    private Long idRestaurant;
    private String nomRestaurant;
    private String telephone;
    private String adresse;
    private String wifi;
    private String mdpWifi;
    private int nbrTables;
    @Lob
    private String logo;
}
