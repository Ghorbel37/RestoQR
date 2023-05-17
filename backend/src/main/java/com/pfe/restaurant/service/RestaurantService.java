package com.pfe.restaurant.service;


import com.pfe.restaurant.dto.RestaurantDto;
import com.pfe.restaurant.model.Restaurant;
import com.pfe.restaurant.mapper.RestaurantMapper;
import com.pfe.restaurant.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final RestaurantMapper restaurantMapper;


    public RestaurantDto save(RestaurantDto restaurantDto) {
        Restaurant restaurant = restaurantMapper.fromDtoToEntity(restaurantDto);
        restaurant = restaurantRepository.save(restaurant);
        return restaurantMapper.fromEntityToDto(restaurant);
    }

    public List<RestaurantDto> findAll() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        return restaurantMapper.fromEntitiesToDtoList(restaurants);
    }

    public RestaurantDto findOne(Long id) {
        return restaurantMapper.fromEntityToDto(restaurantRepository.findById(id).get());
    }

    public void delete(Long id) {
        restaurantRepository.deleteById(id);
    }

    public RestaurantDto update(Long id, RestaurantDto restaurantDto) {
        Restaurant existingRestaurant = restaurantRepository.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        Restaurant updatedRestaurant = restaurantMapper.fromDtoToEntity(restaurantDto);
        updatedRestaurant.setIdRestaurant(existingRestaurant.getIdRestaurant());
        restaurantRepository.save(updatedRestaurant);
        return restaurantMapper.fromEntityToDto(updatedRestaurant);
    }
}
