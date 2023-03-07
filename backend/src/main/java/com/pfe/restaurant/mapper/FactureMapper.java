package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.FactureDto;
import com.pfe.restaurant.entity.Facture;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {CommandeMapper.class, EmployeMapper.class})
public interface FactureMapper extends GenericMapper<FactureDto, Facture> {

}