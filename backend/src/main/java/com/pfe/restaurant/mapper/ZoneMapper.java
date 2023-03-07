package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.ZoneDto;
import com.pfe.restaurant.entity.Zone;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ZoneMapper extends GenericMapper<ZoneDto, Zone> {

}