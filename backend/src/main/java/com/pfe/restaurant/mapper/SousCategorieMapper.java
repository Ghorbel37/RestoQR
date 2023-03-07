package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.SousCategorieDto;
import com.pfe.restaurant.entity.SousCategorie;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface SousCategorieMapper extends GenericMapper<SousCategorieDto, SousCategorie> {

}