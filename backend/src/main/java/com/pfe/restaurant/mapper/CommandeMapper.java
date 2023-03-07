package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.CommandeDto;
import com.pfe.restaurant.entity.Commande;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {LigneCommandeMapper.class, ClientMapper.class, TableRestaurantMapper.class})
public interface CommandeMapper extends GenericMapper<CommandeDto, Commande> {

}