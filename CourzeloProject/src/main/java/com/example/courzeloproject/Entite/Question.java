package com.example.courzeloproject.Entite;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "question")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class Question {
    @Id
    private String id;
    private String category;
    private String difficultylevel;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String question_title;
    private String right_answer;
}
