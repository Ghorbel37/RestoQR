package com.pfe.restaurant.service;


import com.pfe.restaurant.dto.UserDto;
import com.pfe.restaurant.model.User;
import com.pfe.restaurant.mapper.UserMapper;
import com.pfe.restaurant.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return userMapper.fromEntityToDto(optionalUser.get());
        } else {
            throw new RuntimeException("User with ID " + id + " not found");
        }
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
    public UserDto findByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            return userMapper.fromEntityToDto(optionalUser.get());
        } else {
            throw new RuntimeException("User with email " + email + " not found");
        }
    }
}
