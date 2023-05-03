package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.TableRestaurantDto;
import com.pfe.restaurant.model.TableRestaurant;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, uses = {ZoneMapper.class})
public interface TableRestaurantMapper extends GenericMapper<TableRestaurantDto, TableRestaurant> {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    TableRestaurant partialUpdate(TableRestaurantDto tableRestaurantDto, @MappingTarget TableRestaurant tableRestaurant);
}