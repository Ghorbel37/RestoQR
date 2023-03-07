package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.EmployeDto;
import com.pfe.restaurant.entity.Employe;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class})
public interface EmployeMapper extends GenericMapper<EmployeDto, Employe> {

}