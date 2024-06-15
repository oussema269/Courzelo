package com.example.courzeloproject.Entite;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("reclamation")
public class Reclamtion {
    @Id
    private String reclamationId ;
    @Field("date")
    private LocalDateTime dateReclamation ;
    @Field("titre")

    private String titre ;
    @Field("description")

    private String description ;
    @DBRef
    private User user ;

    public void setDescription(String description) {
        // Check for bad words in the description
        this.description = sanitizeDescription(description);
    }

    // Method to sanitize the description by replacing bad words with asterisks
    private String sanitizeDescription(String text) {
     // bad wods list
        List<String> badWords = Arrays.asList("nabil", "hamdi", "aymen");

        // Replace bad words with ***
        for (String badWord : badWords) {

            text = text.replaceAll("(?i)" + badWord, "*".repeat(badWord.length()));
        }
        return text;
    }


}
