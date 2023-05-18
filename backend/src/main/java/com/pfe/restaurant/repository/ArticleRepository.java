package com.pfe.restaurant.repository;

import com.pfe.restaurant.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByCategorie_Active(boolean active);
}