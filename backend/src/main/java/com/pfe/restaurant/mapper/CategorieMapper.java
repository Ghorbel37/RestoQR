package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.CategorieDto;
import com.pfe.restaurant.model.Categorie;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {SousCategorieMapper.class})
public interface CategorieMapper extends GenericMapper<CategorieDto, Categorie> {
}