package com.example.courzeloproject.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questionwrapper")
@NoArgsConstructor
//@AllArgsConstructor
@Getter
@Setter
@Data
public class QuestionWrapper {
    @Id
    @JsonIgnore
    private String id;
    private String question_title;
    private String option1;
    private String option2;
    private String option3;
    private String option4;

    public QuestionWrapper(String id, String question_title, String option1, String option2, String option3, String option4) {
        this.id = id;
        this.question_title = question_title;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
    }
}
