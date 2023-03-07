package com.pfe.restaurant.mapper;

import java.util.List;

public interface GenericMapper<T, I> {
    List<T> fromEntitiesToDtoList(List<I> i);

    List<I> fromDtoListToEntities(List<T> t);

    T fromEntityToDto(I i);

    I fromDtoToEntity(T t);
}