package com.ssafy.backend.dto;

import com.ssafy.backend.entity.Game;
import com.ssafy.backend.entity.User;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserGameDto {
    private Long userGameId;
    private int userAttack;
    private int userDefence;
    private float userDistance;
    private int userGoal;
    private float userHeart;
    private String userHeatmap;
    private float userMaxSpeed;
    private float userPass;
    private String userPosition;
    private int userSave;
    private float userSpeed;
    private int userSprint;
    private int userStamina;

}
