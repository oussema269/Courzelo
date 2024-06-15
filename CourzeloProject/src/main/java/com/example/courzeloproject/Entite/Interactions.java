package com.example.courzeloproject.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "interactions")
public class Interactions {
    @Id
    private String id;
    @Length(max = 100)
    private String commentaire;
    @DBRef
    private User user;
    @JsonIgnore
    @DBRef
    private Blog blog;
    @DBRef
    List<Interactions> replay;
    @JsonIgnore
    @DBRef
    Interactions parentInteraction;


}
