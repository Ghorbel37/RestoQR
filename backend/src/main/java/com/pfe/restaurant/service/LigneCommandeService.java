package com.pfe.restaurant.service;

import com.pfe.restaurant.dto.LigneCommandeDto;
import com.pfe.restaurant.model.LigneCommande;
import com.pfe.restaurant.mapper.LigneCommandeMapper;
import com.pfe.restaurant.repository.LigneCommandeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
        List<LigneCommande> ligneCommandes = ligneCommandeMapper.fromDtoListToEntities(ligneCommandeDto);
        ligneCommandes = ligneCommandeRepository.saveAll(ligneCommandes);
        return ligneCommandeMapper.fromEntitiesToDtoList(ligneCommandes);
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
    public LigneCommandeDto updateQuantite(Long id, int quantite) {
        LigneCommande existingLigneCommande = ligneCommandeRepository.findById(id).orElseThrow(() -> new RuntimeException("LigneCommande not found"));
        existingLigneCommande.setQuantite(quantite);
        BigDecimal prixArticle = existingLigneCommande.getArticle().getPrix();
        BigDecimal nouveauPrixLigne = BigDecimal.valueOf(quantite).multiply(prixArticle);
        existingLigneCommande.setPrixLigne(nouveauPrixLigne);
        ligneCommandeRepository.save(existingLigneCommande);
        return ligneCommandeMapper.fromEntityToDto(existingLigneCommande);
    }
}
