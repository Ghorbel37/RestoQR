package com.pfe.restaurant.service;


import com.pfe.restaurant.dto.CategorieDto;
import com.pfe.restaurant.model.Categorie;
import com.pfe.restaurant.mapper.CategorieMapper;
import com.pfe.restaurant.repository.CategorieRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategorieService {
    private final CategorieRepository categorieRepository;
    private final CategorieMapper categorieMapper;


    public CategorieDto save(CategorieDto categorieDto) {
        Categorie categorie = categorieMapper.fromDtoToEntity(categorieDto);
        categorie = categorieRepository.save(categorie);
        return categorieMapper.fromEntityToDto(categorie);
    }

    public List<CategorieDto> findAll() {
        List<Categorie> categories = categorieRepository.findAll();
        return categorieMapper.fromEntitiesToDtoList(categories);
    }

    public List<CategorieDto> findAllMenu() {
        List<Categorie> categories = categorieRepository.findByActive(true);
        return categorieMapper.fromEntitiesToDtoList(categories);
    }

    public CategorieDto findOne(Long id) {
        return categorieMapper.fromEntityToDto(categorieRepository.findById(id).get());
    }

    public void delete(Long id) {
        categorieRepository.deleteById(id);
    }

    public CategorieDto update(Long id, CategorieDto categorieDto) {
        Categorie existingCategorie = categorieRepository.findById(id).orElseThrow(() -> new RuntimeException("Categorie not found"));
        Categorie updatedCategorie = categorieMapper.fromDtoToEntity(categorieDto);
        updatedCategorie.setIdCategorie(existingCategorie.getIdCategorie());
        categorieRepository.save(updatedCategorie);
        return categorieMapper.fromEntityToDto(updatedCategorie);
    }
}
