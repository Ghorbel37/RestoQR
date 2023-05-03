package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.RatingDto;
import com.pfe.restaurant.model.Rating;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface RatingMapper extends GenericMapper<RatingDto, Rating> {

}