package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserGameDto {
    private String userHeatmap;
    private String userDistance;
    private String userAttack;
    private String userPhysical;
    private String userDefence;
    private String userSpeed;
    private String userStamina;
    private String userSprint;
    private String userGoal;
    private String userSave;
    private String userMaxSpeed;
    private String userHeart;
    private String userPass;
    private String userPosition;
}
