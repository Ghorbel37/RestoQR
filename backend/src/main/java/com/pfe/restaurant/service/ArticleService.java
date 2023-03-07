package com.pfe.restaurant.service;


import com.pfe.restaurant.dto.ArticleDto;
import com.pfe.restaurant.entity.Article;
import com.pfe.restaurant.mapper.ArticleMapper;
import com.pfe.restaurant.repository.ArticleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;


    public ArticleDto save(ArticleDto articleDto) {
        Article article = articleMapper.fromDtoToEntity(articleDto);
        article = articleRepository.save(article);
        return articleMapper.fromEntityToDto(article);
    }

    public List<ArticleDto> findAll() {
        List<Article> articles = articleRepository.findAll();
        return articleMapper.fromEntitiesToDtoList(articles);
    }

    public ArticleDto findOne(Long id) {
        return articleMapper.fromEntityToDto(articleRepository.findById(id).get());
    }

    public void delete(Long id) {
        articleRepository.deleteById(id);
    }

    public ArticleDto update(Long id, ArticleDto articleDto) {
        Article existingArticle = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
        Article updatedArticle = articleMapper.fromDtoToEntity(articleDto);
        updatedArticle.setIdArticle(existingArticle.getIdArticle());
        articleRepository.save(updatedArticle);
        return articleMapper.fromEntityToDto(updatedArticle);
    }
}
