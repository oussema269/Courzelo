package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Class;

import java.util.List;

public interface IClassService {
    Class addClass(Class newclass);
    List<Class> getAllClasses();
    Class getClassById(String id);
}
