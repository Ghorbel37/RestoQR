package com.pfe.restaurant.repository;


import com.pfe.restaurant.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RatingRepository extends JpaRepository<Rating, Long> {
//    List<Rating> findByArticleId(Long articleId);
}