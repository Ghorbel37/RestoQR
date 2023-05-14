package com.pfe.restaurant.controller;

import com.pfe.restaurant.dto.CategorieDto;
import com.pfe.restaurant.service.CategorieService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@AllArgsConstructor
public class CategorieController {
    private final CategorieService categorieService;

    @PostMapping
    public ResponseEntity<CategorieDto> create(@RequestBody CategorieDto categorieDto) {
        CategorieDto result = categorieService.save(categorieDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<CategorieDto>> getAll() {
        List<CategorieDto> result = categorieService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategorieDto> getById(@PathVariable Long id) {
        CategorieDto result = categorieService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategorieDto> update(@PathVariable Long id, @RequestBody CategorieDto categorieDto) {
        CategorieDto updatedCategorieDto = categorieService.update(id,categorieDto);
        return ResponseEntity.ok(updatedCategorieDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categorieService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
