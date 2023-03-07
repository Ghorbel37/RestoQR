package com.pfe.restaurant.ressource;

import com.pfe.restaurant.dto.ZoneDto;
import com.pfe.restaurant.service.ZoneService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/zones")
@AllArgsConstructor
public class ZoneRessource {
    private final ZoneService zoneService;

    @PostMapping
    public ResponseEntity<ZoneDto> create(@RequestBody ZoneDto zoneDto) {
        ZoneDto result = zoneService.save(zoneDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<ZoneDto>> getAll() {
        List<ZoneDto> result = zoneService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ZoneDto> getById(@PathVariable Long id) {
        ZoneDto result = zoneService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ZoneDto> update(@PathVariable Long id, @RequestBody ZoneDto zoneDto) {
        ZoneDto updatedZoneDto = zoneService.update(id,zoneDto);
        return ResponseEntity.ok(updatedZoneDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        zoneService.delete(id);
        return ResponseEntity.noContent().build();
    }
}