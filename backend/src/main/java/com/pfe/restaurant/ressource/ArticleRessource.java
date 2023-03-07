package com.pfe.restaurant.ressource;

import com.pfe.restaurant.dto.ArticleDto;
import com.pfe.restaurant.service.ArticleService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@AllArgsConstructor
public class ArticleRessource {
    private final ArticleService articleService;

    @PostMapping
    public ResponseEntity<ArticleDto> create(@RequestBody ArticleDto articleDto) {
        ArticleDto result = articleService.save(articleDto);
        return ResponseEntity.created(null).body(result);
    }

    @GetMapping
    public ResponseEntity<List<ArticleDto>> getAll() {
        List<ArticleDto> result = articleService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDto> getById(@PathVariable Long id) {
        ArticleDto result = articleService.findOne(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleDto> update(@PathVariable Long id, @RequestBody ArticleDto articleDto) {
        ArticleDto updatedArticleDto = articleService.update(id,articleDto);
        return ResponseEntity.ok(updatedArticleDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        articleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
