package com.pfe.restaurant.service;


import com.pfe.restaurant.dto.EmployeDto;
import com.pfe.restaurant.entity.Employe;
import com.pfe.restaurant.mapper.EmployeMapper;
import com.pfe.restaurant.repository.EmployeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeService {
    private final EmployeRepository employeRepository;
    private final EmployeMapper employeMapper;


    public EmployeDto save(EmployeDto employeDto) {
        Employe employe = employeMapper.fromDtoToEntity(employeDto);
        employe = employeRepository.save(employe);
        return employeMapper.fromEntityToDto(employe);
    }

    public List<EmployeDto> findAll() {
        List<Employe> employes = employeRepository.findAll();
        return employeMapper.fromEntitiesToDtoList(employes);
    }

    public EmployeDto findOne(Long id) {
        return employeMapper.fromEntityToDto(employeRepository.findById(id).get());
    }

    public void delete(Long id) {
        employeRepository.deleteById(id);
    }

    public EmployeDto update(Long id, EmployeDto employeDto) {
        Employe existingEmploye = employeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employe not found"));
        Employe updatedEmploye = employeMapper.fromDtoToEntity(employeDto);
        updatedEmploye.setId(existingEmploye.getId());
        employeRepository.save(updatedEmploye);
        return employeMapper.fromEntityToDto(updatedEmploye);
    }
}
