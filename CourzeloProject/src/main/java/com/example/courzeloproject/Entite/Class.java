package com.example.courzeloproject.Entite;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "class")
public class Class {
    @Id
    private String classId;
    private String nomClass;
    private LocalDateTime createdAt;
    @DBRef
    private List<User> formateurs;
    @DBRef
    private List<User> etudiants;
    @DBRef
    private List<Cour> cours;
}
