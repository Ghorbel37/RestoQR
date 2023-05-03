package com.pfe.restaurant.service;

import com.pfe.restaurant.dto.ZoneDto;
import com.pfe.restaurant.model.Zone;
import com.pfe.restaurant.mapper.ZoneMapper;
import com.pfe.restaurant.repository.ZoneRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ZoneService {
    private final ZoneRepository zoneRepository;
    private final ZoneMapper zoneMapper;


    public ZoneDto save(ZoneDto zoneDto) {
        Zone zone = zoneMapper.fromDtoToEntity(zoneDto);
        zone = zoneRepository.save(zone);
        return zoneMapper.fromEntityToDto(zone);
    }

    public List<ZoneDto> findAll() {
        List<Zone> zones = zoneRepository.findAll();
        return zoneMapper.fromEntitiesToDtoList(zones);
    }

    public ZoneDto findOne(Long id) {
        return zoneMapper.fromEntityToDto(zoneRepository.findById(id).get());
    }

    public void delete(Long id) {
        zoneRepository.deleteById(id);
    }

    public ZoneDto update(Long id, ZoneDto zoneDto) {
        Zone existingZone = zoneRepository.findById(id).orElseThrow(() -> new RuntimeException("Zone not found"));
        Zone updatedZone = zoneMapper.fromDtoToEntity(zoneDto);
        updatedZone.setIdZone(existingZone.getIdZone());
        zoneRepository.save(updatedZone);
        return zoneMapper.fromEntityToDto(updatedZone);
    }
}