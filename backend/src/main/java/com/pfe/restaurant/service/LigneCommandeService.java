package com.pfe.restaurant.service;

import com.pfe.restaurant.dto.LigneCommandeDto;
import com.pfe.restaurant.entity.LigneCommande;
import com.pfe.restaurant.mapper.LigneCommandeMapper;
import com.pfe.restaurant.repository.LigneCommandeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LigneCommandeService {
    private final LigneCommandeMapper ligneCommandeMapper;
    private final LigneCommandeRepository ligneCommandeRepository;

    public LigneCommandeDto save(LigneCommandeDto ligneCommandeDto) {
        LigneCommande ligneCommande = ligneCommandeMapper.fromDtoToEntity(ligneCommandeDto);
        ligneCommande = ligneCommandeRepository.save(ligneCommande);
        return ligneCommandeMapper.fromEntityToDto(ligneCommande);
    }

    public List<LigneCommandeDto> saveAll(List<LigneCommandeDto> ligneCommandeDto) {
        List<LigneCommande> ligneCommande = ligneCommandeMapper.fromDtoListToEntities(ligneCommandeDto);
        ligneCommande = ligneCommandeRepository.saveAll(ligneCommande);
        return ligneCommandeMapper.fromEntitiesToDtoList(ligneCommande);
    }

    public List<LigneCommandeDto> findAll() {
        List<LigneCommande> ligneCommandes = ligneCommandeRepository.findAll();
        return ligneCommandeMapper.fromEntitiesToDtoList(ligneCommandes);
    }

    public LigneCommandeDto findOne(Long id) {
        return ligneCommandeMapper.fromEntityToDto(ligneCommandeRepository.findById(id).get());
    }

    public void delete(Long id) {
        ligneCommandeRepository.deleteById(id);
    }

    public LigneCommandeDto update(Long id, LigneCommandeDto ligneCommandeDto) {
        LigneCommande existingLigneCommande = ligneCommandeRepository.findById(id).orElseThrow(() -> new RuntimeException("LigneCommande not found"));
        LigneCommande updatedLigneCommande = ligneCommandeMapper.fromDtoToEntity(ligneCommandeDto);
        updatedLigneCommande.setIdLigneCommande(existingLigneCommande.getIdLigneCommande());
        ligneCommandeRepository.save(updatedLigneCommande);
        return ligneCommandeMapper.fromEntityToDto(updatedLigneCommande);
    }
}
