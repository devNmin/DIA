package com.ssafy.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "userinfo")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserInfo {
    @Id
    @Column(name = "userinfo_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userinfoId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "user_profile_image") // 프로필 이미지 url
    private String userPfofileImage;
    @Column(name = "user_name") // 이름
    private String userName;
    @Column(name = "user_age") // 나이
    private int userAge;
    @Column(name = "user_position") // 포지션
    private String userPosition;
    @Column(name = "user_height") // 키
    private float userHeight;
    @Column(name = "user_weight") // 몸무게
    private float userWeight;
}