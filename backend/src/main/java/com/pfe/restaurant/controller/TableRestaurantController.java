package com.pfe.restaurant.controller;

import com.pfe.restaurant.dto.TableRestaurantDto;
import com.pfe.restaurant.service.TableRestaurantService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tables")
@AllArgsConstructor
public class TableRestaurantController {
    private final TableRestaurantService tableRestaurantService;

    @PostMapping
    public ResponseEntity<TableRestaurantDto> create(@RequestBody TableRestaurantDto tableRestaurantDto) {
        TableRestaurantDto result = tableRestaurantService.save(tableRestaurantDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<TableRestaurantDto>> getAll() {
        List<TableRestaurantDto> result = tableRestaurantService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TableRestaurantDto> getById(@PathVariable Long id) {
        TableRestaurantDto result = tableRestaurantService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TableRestaurantDto> update(@PathVariable Long id, @RequestBody TableRestaurantDto tableRestaurantDto) {
        TableRestaurantDto updatedTableRestaurantDto = tableRestaurantService.update(id,tableRestaurantDto);
        return ResponseEntity.ok(updatedTableRestaurantDto);
    }
    @GetMapping("/numero/{numero}")
    public ResponseEntity<TableRestaurantDto> getTableByNumero(@PathVariable int numero) {
        Optional<TableRestaurantDto> result = tableRestaurantService.findByNumero(numero);
        return result.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tableRestaurantService.delete(id);
        return ResponseEntity.noContent().build();
    }
}