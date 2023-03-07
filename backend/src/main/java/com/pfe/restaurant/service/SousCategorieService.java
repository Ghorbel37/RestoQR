package com.pfe.restaurant.service;

import com.pfe.restaurant.dto.SousCategorieDto;
import com.pfe.restaurant.entity.SousCategorie;
import com.pfe.restaurant.mapper.SousCategorieMapper;
import com.pfe.restaurant.repository.SousCategorieRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SousCategorieService {
    private final SousCategorieRepository sousCategorieRepository;
    private final SousCategorieMapper sousCategorieMapper;

    public SousCategorieDto save(SousCategorieDto sousCategorieDto) {
        SousCategorie sousCategorie = sousCategorieMapper.fromDtoToEntity(sousCategorieDto);
        sousCategorie = sousCategorieRepository.save(sousCategorie);
        return sousCategorieMapper.fromEntityToDto(sousCategorie);
    }

    public List<SousCategorieDto> findAll() {
        List<SousCategorie> sousCategories = sousCategorieRepository.findAll();
        return sousCategorieMapper.fromEntitiesToDtoList(sousCategories);
    }

    public SousCategorieDto findOne(Long id) {
        return sousCategorieMapper.fromEntityToDto(sousCategorieRepository.findById(id).get());
    }

    public void delete(Long id) {
        sousCategorieRepository.deleteById(id);
    }

    public SousCategorieDto update(Long id, SousCategorieDto sousCategorieDto) {
        SousCategorie existingSousCategorie = sousCategorieRepository.findById(id).orElseThrow(() -> new RuntimeException("SousCategorie not found"));
        SousCategorie updatedSousCategorie = sousCategorieMapper.fromDtoToEntity(sousCategorieDto);
        updatedSousCategorie.setIdSousCategorie(existingSousCategorie.getIdSousCategorie());
        sousCategorieRepository.save(updatedSousCategorie);
        return sousCategorieMapper.fromEntityToDto(updatedSousCategorie);
    }
}