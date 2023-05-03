package com.pfe.restaurant.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Categorie implements Serializable {
    //@Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCategorie;
    private String nom;
    @Lob
    private String image;
    @OneToMany(mappedBy = "categorie")//(fetch =FetchType.EAGER)//, cascade = CascadeType.DETACH)//orphanRemoval = true)
    //@JoinColumn(name = "categorie_id")
    //(mappedBy = "categorie",cascade = CascadeType.ALL )
    //(cascade = CascadeType.MERGE)
    //(cascade = CascadeType.PERSIST)
    //(cascade = CascadeType.ALL)
    //we use this if  i need to create a Categorie w zid na3mel creation mte3 sous Categorie
    private Collection<Article> articles;
}
