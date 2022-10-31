package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HeartDto {
    private Integer userId;
    private String userName;
    private String userEmail;
    private Float userHeartRate;
}
