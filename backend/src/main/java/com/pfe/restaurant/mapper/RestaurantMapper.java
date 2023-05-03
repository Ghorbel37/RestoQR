package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.RestaurantDto;
import com.pfe.restaurant.model.Restaurant;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface RestaurantMapper extends GenericMapper<RestaurantDto, Restaurant> {

}