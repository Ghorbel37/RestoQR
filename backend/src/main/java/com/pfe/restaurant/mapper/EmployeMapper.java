package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.EmployeDto;
import com.pfe.restaurant.model.Employe;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class})
public interface EmployeMapper extends GenericMapper<EmployeDto, Employe> {

}