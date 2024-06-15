package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Blog;
import com.example.courzeloproject.Entite.Interactions;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {
    Blog findBlogByBlogCode(String code);
    List<Blog> findBlogByStatusIs(Boolean status);


}
