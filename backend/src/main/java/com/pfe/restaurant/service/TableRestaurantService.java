package com.pfe.restaurant.service;

import com.pfe.restaurant.dto.TableRestaurantDto;
import com.pfe.restaurant.entity.TableRestaurant;
import com.pfe.restaurant.mapper.TableRestaurantMapper;
import com.pfe.restaurant.repository.TableRestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public List<TableRestaurantDto> saveMultipleTable(int nbr){
        List<TableRestaurant> tableRestaurants=new ArrayList<>();
        if(nbr>0){
            for(int i=0; i<nbr;i++){
                this.findByNumero(i);
                TableRestaurant existing=tableRestaurantRepository.findByNumero(i+1).orElse(null);
                if(existing==null) {
                    TableRestaurant table = new TableRestaurant();
                    table.setNumero(i + 1);
                    table = tableRestaurantRepository.save(table);
                    tableRestaurants.add(table);
                }
                else
                    tableRestaurants.add(existing);
            }
        }
        return tableRestaurantMapper.fromEntitiesToDtoList(tableRestaurants);
    }

    public Optional<TableRestaurantDto> findByNumero(int nbr){
        return tableRestaurantRepository.findByNumero(nbr).map(tableRestaurantMapper::fromEntityToDto);
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
        updatedTableRestaurant.setIdTable(existingTableRestaurant.getIdTable());
        tableRestaurantRepository.save(updatedTableRestaurant);
        return tableRestaurantMapper.fromEntityToDto(updatedTableRestaurant);
    }
}


