package com.pfe.restaurant.service;

import com.pfe.restaurant.dto.CommandeDto;
import com.pfe.restaurant.model.Commande;
import com.pfe.restaurant.mapper.CommandeMapper;
import com.pfe.restaurant.repository.CommandeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final CommandeMapper commandeMapper;


    public CommandeDto save(CommandeDto commandeDto) {
        Commande commande = commandeMapper.fromDtoToEntity(commandeDto);
        commande = commandeRepository.save(commande);
        return commandeMapper.fromEntityToDto(commande);
    }

    public List<CommandeDto> findAll() {
        List<Commande> commandes = commandeRepository.findAll();
        return commandeMapper.fromEntitiesToDtoList(commandes);
    }

    public CommandeDto findOne(Long id) {
        return commandeMapper.fromEntityToDto(commandeRepository.findById(id).get());
    }

    public void delete(Long id) {
        commandeRepository.deleteById(id);
    }

    public CommandeDto update(Long id, CommandeDto commandeDto) {
        Commande existingCommande = commandeRepository.findById(id).orElseThrow(() -> new RuntimeException("Commande not found"));
        Commande updatedCommande = commandeMapper.fromDtoToEntity(commandeDto);
        updatedCommande.setIdCommande(existingCommande.getIdCommande());
        commandeRepository.save(updatedCommande);
        return commandeMapper.fromEntityToDto(updatedCommande);
    }
}
