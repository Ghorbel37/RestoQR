package com.pfe.restaurant.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link com.pfe.restaurant.entity.User} entity
 */
@Data
public class AuthRequestDto implements Serializable {
    private final String email;
    private final String password;
}