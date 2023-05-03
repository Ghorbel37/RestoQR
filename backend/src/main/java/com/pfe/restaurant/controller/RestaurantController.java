package com.pfe.restaurant.controller;



import com.pfe.restaurant.dto.RestaurantDto;
import com.pfe.restaurant.service.RestaurantService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
@AllArgsConstructor
public class RestaurantController {
    private final RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<RestaurantDto> create(@RequestBody RestaurantDto restaurantDto) {
        RestaurantDto result = restaurantService.save(restaurantDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<RestaurantDto> getRestaurant() {
        RestaurantDto result = restaurantService.findOne(1L);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantDto> getById(@PathVariable Long id) {
        RestaurantDto result = restaurantService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping
    public ResponseEntity<RestaurantDto> update(@RequestBody RestaurantDto restaurantDto) {
        RestaurantDto updatedRestaurantDto = restaurantService.update(1L,restaurantDto);
        return ResponseEntity.ok(updatedRestaurantDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        restaurantService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
