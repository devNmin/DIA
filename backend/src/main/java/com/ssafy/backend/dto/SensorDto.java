package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SensorDto {
    private Float userSteps;
    private Float userAverageHeartRate;
}
