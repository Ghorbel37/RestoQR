package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.UserDto;
import com.pfe.restaurant.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper extends GenericMapper<UserDto, User> {

}