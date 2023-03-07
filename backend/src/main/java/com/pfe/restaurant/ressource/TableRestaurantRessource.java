package com.pfe.restaurant.ressource;

import com.pfe.restaurant.dto.TableRestaurantDto;
import com.pfe.restaurant.service.TableRestaurantService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tablerestaurants")
@AllArgsConstructor
public class TableRestaurantRessource {
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tableRestaurantService.delete(id);
        return ResponseEntity.noContent().build();
    }
}