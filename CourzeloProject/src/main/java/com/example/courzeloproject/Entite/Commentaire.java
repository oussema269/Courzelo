package com.example.courzeloproject.Entite;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Commentaire")
public class Commentaire implements Serializable {

    @Id
    private String id;

    private String fullname;
    private String email;
    private String subject;
    private String corp;
    private String Reponse;

    private Date dateComm;

    @DBRef
    private User user ;




}
