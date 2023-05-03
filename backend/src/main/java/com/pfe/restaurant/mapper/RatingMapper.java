package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.RatingDto;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface RatingMapper<Rating> extends GenericMapper<RatingDto, Rating> {

}