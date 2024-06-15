package com.example.courzeloproject.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestChangePassword {

    private String user_id;
    @NotBlank
    private String oldPassword;
    @NotBlank
    private String password;


}
