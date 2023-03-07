package com.pfe.restaurant.service;


import com.pfe.restaurant.dto.FactureDto;
import com.pfe.restaurant.entity.Facture;
import com.pfe.restaurant.mapper.FactureMapper;
import com.pfe.restaurant.repository.FactureRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FactureService {
    private final FactureRepository factureRepository;
    private final FactureMapper factureMapper;


    public FactureDto save(FactureDto factureDto) {
        Facture facture = factureMapper.fromDtoToEntity(factureDto);
        facture = factureRepository.save(facture);
        return factureMapper.fromEntityToDto(facture);
    }

    public List<FactureDto> findAll() {
        List<Facture> factures = factureRepository.findAll();
        return factureMapper.fromEntitiesToDtoList(factures);
    }

    public FactureDto findOne(Long id) {
        return factureMapper.fromEntityToDto(factureRepository.findById(id).get());
    }

    public void delete(Long id) {
        factureRepository.deleteById(id);
    }

    public FactureDto update(Long id, FactureDto factureDto) {
        Facture existingFacture = factureRepository.findById(id).orElseThrow(() -> new RuntimeException("Facture not found"));
        Facture updatedFacture = factureMapper.fromDtoToEntity(factureDto);
        updatedFacture.setIdFacture(existingFacture.getIdFacture());
        factureRepository.save(updatedFacture);
        return factureMapper.fromEntityToDto(updatedFacture);
    }
}
