package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.LigneCommandeDto;
import com.pfe.restaurant.entity.LigneCommande;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {ArticleMapper.class})
public interface LigneCommandeMapper extends GenericMapper<LigneCommandeDto, LigneCommande> {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    LigneCommande partialUpdate(LigneCommandeDto ligneCommandeDto, @MappingTarget LigneCommande ligneCommande);
}