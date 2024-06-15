package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Blog;
import com.example.courzeloproject.Entite.Interactions;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InteractionsRepository extends MongoRepository<Interactions, String> {
    List<Interactions> findInteractionsByBlogBlogCode(String blogCode);

}
