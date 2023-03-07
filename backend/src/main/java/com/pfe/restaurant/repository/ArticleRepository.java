package com.pfe.restaurant.repository;

import com.pfe.restaurant.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}