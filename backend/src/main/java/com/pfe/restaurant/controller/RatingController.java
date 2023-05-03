package com.pfe.restaurant.controller;



import com.pfe.restaurant.dto.RatingDto;
import com.pfe.restaurant.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/rating")
@CrossOrigin
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<RatingDto> createRating(@RequestBody RatingDto ratingDto) {
        RatingDto result = ratingService.addRating(ratingDto);
        return ResponseEntity.created(null).body(result);
    }
    @GetMapping
    public ResponseEntity<List<RatingDto>> getAllRating() {
        List<RatingDto> result = ratingService.findAll();
        return ResponseEntity.ok(result);
    }
}
