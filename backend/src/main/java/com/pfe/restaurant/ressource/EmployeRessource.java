package com.pfe.restaurant.ressource;

import com.pfe.restaurant.dto.EmployeDto;
import com.pfe.restaurant.service.EmployeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employes")
@AllArgsConstructor
public class EmployeRessource {
    private final EmployeService employeService;

    @PostMapping
    public ResponseEntity<EmployeDto> create(@RequestBody EmployeDto employeDto) {
        EmployeDto result = employeService.save(employeDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<EmployeDto>> getAll() {
        List<EmployeDto> result = employeService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeDto> getById(@PathVariable Long id) {
        EmployeDto result = employeService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeDto> update(@PathVariable Long id, @RequestBody EmployeDto employeDto) {
        EmployeDto updatedEmployeDto = employeService.update(id,employeDto);
        return ResponseEntity.ok(updatedEmployeDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
