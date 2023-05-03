package com.pfe.restaurant.controller;

import com.pfe.restaurant.dto.FactureDto;
import com.pfe.restaurant.service.FactureService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/factures")
@AllArgsConstructor
public class FactureController {
    private final FactureService factureService;

    @PostMapping
    public ResponseEntity<FactureDto> create(@RequestBody FactureDto factureDto) {
        FactureDto result = factureService.save(factureDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<FactureDto>> getAll() {
        List<FactureDto> result = factureService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FactureDto> getById(@PathVariable Long id) {
        FactureDto result = factureService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FactureDto> update(@PathVariable Long id, @RequestBody FactureDto factureDto) {
        FactureDto updatedFactureDto = factureService.update(id,factureDto);
        return ResponseEntity.ok(updatedFactureDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        factureService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
