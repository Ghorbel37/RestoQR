package com.pfe.restaurant.mapper;

import com.pfe.restaurant.dto.ArticleDto;
import com.pfe.restaurant.model.Article;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ArticleMapper extends GenericMapper<ArticleDto, Article> {

}