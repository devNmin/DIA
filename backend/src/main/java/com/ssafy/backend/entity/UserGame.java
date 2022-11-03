package com.ssafy.backend.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "usergame")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserGame {
    @Id
    @Column(name = "usergame_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long usergameId;

    @Column(name = "user_heatmap") // 해당 경기 히트맵 url
    private String userHeatmap;
    @Column(name = "user_distance") // 총 이동거리
    private String userDistance;
    @Column(name = "user_attack") // 공격력 점수
    private String userAttack;
    @Column(name = "user_physical") // 피지컬 점수
    private String userPhysical;
    @Column(name = "user_defence") // 수비력 점수
    private String userDefence;
    @Column(name = "user_speed") // 스피드 점수
    private String userSpeed;
    @Column(name = "user_stamina") // 체력 점수
    private String userStamina;
    @Column(name = "user_sprint") // 해당 경기 스프린트 횟수
    private String userSprint;
    @Column(name = "user_goal") // 골 횟수
    private String userGoal;
    @Column(name = "user_save") // 수비 성공 횟수
    private String userSave;
    @Column(name = "user_max_speed") // 최고 속력
    private String userMaxSpeed;
    @Column(name = "user_heart") // 평균 심박수
    private String userHeart;
    @Column(name = "user_pass") // 패스 성공률
    private String userPass;
    @Column(name = "user_position") // 해당 경기 포지션
    private String userPosition;


}
