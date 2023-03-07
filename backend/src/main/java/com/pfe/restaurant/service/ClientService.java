package com.pfe.restaurant.service;


import com.pfe.restaurant.dto.ClientDto;
import com.pfe.restaurant.entity.Client;
import com.pfe.restaurant.mapper.ClientMapper;
import com.pfe.restaurant.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;


    public ClientDto save(ClientDto clientDto) {
        Client client = clientMapper.fromDtoToEntity(clientDto);
        client = clientRepository.save(client);
        return clientMapper.fromEntityToDto(client);
    }

    public List<ClientDto> findAll() {
        List<Client> clients = clientRepository.findAll();
        return clientMapper.fromEntitiesToDtoList(clients);
    }

    public ClientDto findOne(Long id) {
        return clientMapper.fromEntityToDto(clientRepository.findById(id).get());
    }

    public void delete(Long id) {
        clientRepository.deleteById(id);
    }

    public ClientDto update(Long id, ClientDto clientDto) {
        Client existingClient = clientRepository.findById(id).orElseThrow(() -> new RuntimeException("Client not found"));
        Client updatedClient = clientMapper.fromDtoToEntity(clientDto);
        updatedClient.setIdClient(existingClient.getIdClient());
        clientRepository.save(updatedClient);
        return clientMapper.fromEntityToDto(updatedClient);
    }
}
