package com.pfe.restaurant.controller;

import com.pfe.restaurant.dto.*;
import com.pfe.restaurant.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/menu")
@AllArgsConstructor
public class MenuController {
    private final CategorieService categorieService;
    private final RestaurantService restaurantService;
    private final TableRestaurantService tableRestaurantService;
    private final CommandeService commandeService;
    private final LigneCommandeService ligneCommandeService;
    private final ArticleService articleService;



    @GetMapping("/restaurant")
    public ResponseEntity<RestaurantDto> getRestaurant() {
        RestaurantDto result = restaurantService.findOne(1L);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategorieDto>> getAllCategories() {
        List<CategorieDto> result = categorieService.findAllMenu();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/articles")
    public ResponseEntity<List<ArticleDto>> getAllArticlesActifs() {
        List<ArticleDto> result = articleService.findAllCategorieActive();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/table/id/{id}")
    public ResponseEntity<TableRestaurantDto> getTableById(@PathVariable Long id) {
        TableRestaurantDto result = tableRestaurantService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/table/numero/{numero}")
    public ResponseEntity<TableRestaurantDto> getTableByNumero(@PathVariable int numero) {
        Optional<TableRestaurantDto> result = tableRestaurantService.findByNumero(numero);
        return result.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/ligneCommandes/saveAll")
    public ResponseEntity<List<LigneCommandeDto>> saveAllLigneCommandes(@RequestBody List<LigneCommandeDto> ligneCommandeDtos) {
        List<LigneCommandeDto> savedLigneCommandeDtos = ligneCommandeService.saveAll(ligneCommandeDtos);
        return ResponseEntity.ok(savedLigneCommandeDtos);
    }

    @PostMapping("/commande")
    public ResponseEntity<CommandeDto> saveCommande(@RequestBody CommandeDto commandeDto) {
        CommandeDto result = commandeService.save(commandeDto);
        return ResponseEntity.created(null).body(result);
    }
}
