package com.pfe.restaurant.controller;

import com.pfe.restaurant.dto.CommandeDto;
import com.pfe.restaurant.service.CommandeService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/commandes")
@AllArgsConstructor
public class CommandeController {
    private final CommandeService commandeService;

    @PostMapping
    public ResponseEntity<CommandeDto> create(@RequestBody CommandeDto commandeDto) {
        CommandeDto result = commandeService.save(commandeDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<CommandeDto>> getAll() {
        List<CommandeDto> result = commandeService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommandeDto> getById(@PathVariable Long id) {
        CommandeDto result = commandeService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommandeDto> update(@PathVariable Long id, @RequestBody CommandeDto commandeDto) {
        CommandeDto updatedCommandeDto = commandeService.update(id,commandeDto);
        return ResponseEntity.ok(updatedCommandeDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        commandeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ByDate/{date}")
    public ResponseEntity<List<CommandeDto>> getCommandesByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        List<CommandeDto> result = commandeService.findByDate(date);
        return ResponseEntity.ok(result);
    }
}
