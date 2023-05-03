package com.pfe.restaurant.controller;

import com.pfe.restaurant.dto.UserDto;
import com.pfe.restaurant.service.JwtService;
import com.pfe.restaurant.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<UserDto> create(@RequestBody UserDto userDto) {
        UserDto result = userService.save(userDto);
        return ResponseEntity.created(null).body(result);
    }

    @PostMapping("/save")
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) {
        UserDto savedUserDto = userService.save(userDto);
        return ResponseEntity.ok(savedUserDto);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {
        List<UserDto> result = userService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getById(@PathVariable Long id) {
        UserDto result = userService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(@PathVariable Long id, @RequestBody UserDto userDto) {
        UserDto updatedUserDto = userService.update(id,userDto);
        return ResponseEntity.ok(updatedUserDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        Optional<UserDto> result = Optional.ofNullable(userService.findByEmail(email));
        return result.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/me")
    public ResponseEntity<UserDto> getLoggedInUser(HttpServletRequest request) {
        String email = jwtService.extractEmailFromToken(request.getHeader("Authorization"));
        UserDto userDto = userService.findByEmail(email);
        if (userDto == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(userDto);
        }
    }
}
