package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserInfoDto {
    private Long userId;
    private String userEmail;
    private String userName;
}
