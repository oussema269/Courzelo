package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Class;
import com.example.courzeloproject.Repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClassService implements IClassService{
    @Autowired
    ClassRepository classRepository ;


    @Override
    public Class addClass(Class newclass) {
        newclass.setCreatedAt(LocalDateTime.now());
        return classRepository.save(newclass);
    }

    @Override
    public List<Class> getAllClasses() {
        return classRepository.findAll();
    }

    @Override
    public Class getClassById(String id) {
        return classRepository.getClassByClassId(id);
    }
}
