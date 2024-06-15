package com.example.courzeloproject.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Pole")
public class Pole implements Serializable {

    @Id

    private String codePole;
    @NotBlank
    private String nom;
    @NotBlank
    private String adresse;
    @NotBlank
    private String description;
    @NotBlank
    private String photoUrl;
    @JsonIgnore
    @DBRef
    List<Faculte> facultes =new ArrayList<>() ;
    @DBRef
    User user;
}
