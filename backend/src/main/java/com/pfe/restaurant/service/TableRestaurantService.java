package com.pfe.restaurant.service;

import com.pfe.restaurant.dto.TableRestaurantDto;
import com.pfe.restaurant.entity.TableRestaurant;
import com.pfe.restaurant.mapper.TableRestaurantMapper;
import com.pfe.restaurant.repository.TableRestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TableRestaurantService {
    private final TableRestaurantRepository tableRestaurantRepository;
    private final TableRestaurantMapper tableRestaurantMapper;


    public TableRestaurantDto save(TableRestaurantDto tableRestaurantDto) {
        TableRestaurant tableRestaurant = tableRestaurantMapper.fromDtoToEntity(tableRestaurantDto);
        tableRestaurant = tableRestaurantRepository.save(tableRestaurant);
        return tableRestaurantMapper.fromEntityToDto(tableRestaurant);
    }

    public List<TableRestaurantDto> findAll() {
        List<TableRestaurant> tableRestaurants = tableRestaurantRepository.findAll();
        return tableRestaurantMapper.fromEntitiesToDtoList(tableRestaurants);
    }

    public TableRestaurantDto findOne(Long id) {
        return tableRestaurantMapper.fromEntityToDto(tableRestaurantRepository.findById(id).get());
    }

    public void delete(Long id) {
        tableRestaurantRepository.deleteById(id);
    }

    public TableRestaurantDto update(Long id, TableRestaurantDto tableRestaurantDto) {
        TableRestaurant existingTableRestaurant = tableRestaurantRepository.findById(id).orElseThrow(() -> new RuntimeException("TableRestaurant not found"));
        TableRestaurant updatedTableRestaurant = tableRestaurantMapper.fromDtoToEntity(tableRestaurantDto);
        updatedTableRestaurant.setIdTableRestaurant(existingTableRestaurant.getIdTableRestaurant());
        tableRestaurantRepository.save(updatedTableRestaurant);
        return tableRestaurantMapper.fromEntityToDto(updatedTableRestaurant);
    }
}


