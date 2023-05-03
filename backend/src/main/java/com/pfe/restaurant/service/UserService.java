package com.pfe.restaurant.service;


import com.pfe.restaurant.dto.UserDto;
import com.pfe.restaurant.entity.User;
import com.pfe.restaurant.mapper.UserMapper;
import com.pfe.restaurant.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder ;

    public UserDto save(UserDto userDto) {
        User user = userMapper.fromDtoToEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = (User) userRepository.save(user);
        return userMapper.fromEntityToDto(user);
    }

    public List<UserDto> findAll() {
        List<User> users = userRepository.findAll();
        return userMapper.fromEntitiesToDtoList(users);
    }

    public UserDto findOne(Long id) {
        return userMapper.fromEntityToDto(userRepository.findById(id).get());
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public UserDto update(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        User updatedUser = userMapper.fromDtoToEntity(userDto);
        updatedUser.setIdUser(existingUser.getIdUser());
        updatedUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        userRepository.save(updatedUser);
        return userMapper.fromEntityToDto(updatedUser);
    }
}
