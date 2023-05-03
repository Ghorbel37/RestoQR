package com.pfe.restaurant.service;


import com.pfe.restaurant.dto.RatingDto;
import com.pfe.restaurant.mapper.RatingMapper;
import com.pfe.restaurant.model.Rating;
import com.pfe.restaurant.repository.RatingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final RatingMapper ratingMapper;

    public RatingDto addRating(RatingDto ratingDto) {

        Rating rating = ratingMapper.fromDtoToEntity(ratingDto);
        rating =  ratingRepository.save(rating);
        return ratingMapper.fromEntityToDto(rating);
    }


    public List<RatingDto> findAll() {
        List<Rating> articles = ratingRepository.findAll();
        return ratingMapper.fromEntitiesToDtoList(articles);
    }

}