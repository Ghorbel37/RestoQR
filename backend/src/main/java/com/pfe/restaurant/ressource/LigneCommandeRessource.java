package com.pfe.restaurant.ressource;

import com.pfe.restaurant.dto.LigneCommandeDto;
import com.pfe.restaurant.service.LigneCommandeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lignecommandes")
@AllArgsConstructor
public class LigneCommandeRessource {

    private final LigneCommandeService ligneCommandeService;

    @PostMapping
    public ResponseEntity<LigneCommandeDto> create(@RequestBody LigneCommandeDto ligneCommandeDto) {
        LigneCommandeDto result = ligneCommandeService.save(ligneCommandeDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<LigneCommandeDto>> getAll() {
        List<LigneCommandeDto> result = ligneCommandeService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LigneCommandeDto> getById(@PathVariable Long id) {
        LigneCommandeDto result = ligneCommandeService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LigneCommandeDto> update(@PathVariable Long id, @RequestBody LigneCommandeDto ligneCommandeDto) {
        LigneCommandeDto updatedLigneCommandeDto = ligneCommandeService.update(id,ligneCommandeDto);
        return ResponseEntity.ok(updatedLigneCommandeDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ligneCommandeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
