package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserLoginDto {
    private String userEmail;
    private String userPassword;
    private String userPassword2;
    private String userName;
    private Integer userAge;
    private Float userHeight;
    private Float userWeight;
}