package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserWearDto {
    private String userEmail;
    private String userName;
}
