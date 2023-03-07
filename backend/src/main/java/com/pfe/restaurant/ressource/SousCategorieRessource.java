package com.pfe.restaurant.ressource;

import com.pfe.restaurant.dto.SousCategorieDto;
import com.pfe.restaurant.service.SousCategorieService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/souscategories")
@AllArgsConstructor
public class SousCategorieRessource {

    private final SousCategorieService sousCategorieService;

    @PostMapping
    public ResponseEntity<SousCategorieDto> create(@RequestBody SousCategorieDto sousCategorieDto) {
        SousCategorieDto result = sousCategorieService.save(sousCategorieDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<SousCategorieDto>> getAll() {
        List<SousCategorieDto> result = sousCategorieService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SousCategorieDto> getById(@PathVariable Long id) {
        SousCategorieDto result = sousCategorieService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SousCategorieDto> update(@PathVariable Long id, @RequestBody SousCategorieDto sousCategorieDto) {
        SousCategorieDto updatedSousCategorieDto = sousCategorieService.update(id,sousCategorieDto);
        return ResponseEntity.ok(updatedSousCategorieDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        sousCategorieService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
