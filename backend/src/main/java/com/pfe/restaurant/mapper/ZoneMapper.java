package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.ZoneDto;
import com.pfe.restaurant.model.Zone;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, uses = {TableRestaurantMapper.class})
public interface ZoneMapper extends GenericMapper<ZoneDto, Zone> {

}