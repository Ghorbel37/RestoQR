package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.UserDto;
import com.pfe.restaurant.entity.User;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper extends GenericMapper<UserDto, User> {

}