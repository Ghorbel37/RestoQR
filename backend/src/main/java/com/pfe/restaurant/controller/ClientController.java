package com.pfe.restaurant.controller;

import com.pfe.restaurant.dto.ClientDto;
import com.pfe.restaurant.dto.UserDto;
import com.pfe.restaurant.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@AllArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientDto> create(@RequestBody ClientDto clientDto) {
        ClientDto result = clientService.save(clientDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<ClientDto>> getAll() {
        List<ClientDto> result = clientService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDto> getById(@PathVariable Long id) {
        ClientDto result = clientService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDto> update(@PathVariable Long id, @RequestBody ClientDto clientDto) {
        ClientDto updatedClientDto = clientService.update(id,clientDto);
        return ResponseEntity.ok(updatedClientDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        clientService.delete(id);
        return ResponseEntity.noContent().build();
    }


    //TODO http://localhost:9090/api/clients/user?userId=8
    @GetMapping("/user")
    public ResponseEntity<ClientDto> getClientByUser(@RequestParam Long userId) {
        UserDto userDto = new UserDto();
        userDto.setIdUser(userId);
        ClientDto result = clientService.findByUser(userDto);
        return ResponseEntity.ok(result);
    }
}
