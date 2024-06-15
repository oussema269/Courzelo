package com.example.courzeloproject.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.LifecycleState;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "blog")
public class Blog {
    @Id
    private String blogCode;
    @NotBlank
    @Length(min = 2, max = 20)
    private String titreBlog;

    private LocalDate dateBlog;
    @NotBlank
    private String domaine;
    @NotBlank
    private String contenu;
    private Boolean status ;
    private String  photo;

    @DBRef
    User user;
    @DBRef
    List<Interactions> interactions;
}
