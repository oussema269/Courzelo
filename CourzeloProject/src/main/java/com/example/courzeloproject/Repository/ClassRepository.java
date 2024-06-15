package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Blog;
import com.example.courzeloproject.Entite.Class;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends MongoRepository<Class, String> {
    Class getClassByClassId(String id);
}
