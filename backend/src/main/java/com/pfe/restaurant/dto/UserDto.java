package com.pfe.restaurant.dto;

import com.pfe.restaurant.entity.Role;
import com.pfe.restaurant.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link User} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {
    private Long idUser;
    private String email;
    private String password;
    private Role role;
}