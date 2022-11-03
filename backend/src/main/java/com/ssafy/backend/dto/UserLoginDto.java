package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDto {
    private String userEmail;
    private String userPassword;
    private String userPassword2;
    private String userName;
    private Integer userAge;

    @Override
    public String toString() {
        return "UserDto{" +
                "userEmail='" + userEmail + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userPassword2='" + userPassword2 + '\'' +
                ", userName='" + userName + '\'' +
                ", userAge=" + userAge +
                '}';
    }
}