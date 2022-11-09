package com.ssafy.backend.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "game")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Game {
    @Id
    @Column(name = "game_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long gameId;

    @Column(name = "game_year") // 경기 시작 년도
    private int gameYear;
    @Column(name = "game_month") // 경기 시작 월
    private int gameMonth;
    @Column(name = "game_day") // 경기 시작 일
    private int gameDay;
    @Column(name = "game_time") // 경기 시작 시간
    private int gameTime;
    @Column(name = "game_video") // 경기 영상 파일 위치
    private String gameVideo;
    @Column(name = "game_xy") // 경기 트래킹 좌표 파일 위치
    @Lob
    private String gameXY;

    public Game(long gameId, int gameYear, int gameMonth, int gameDay, int gameTime) {
        this.gameId = gameId;
        this.gameYear = gameYear;
        this.gameMonth = gameMonth;
        this.gameDay = gameDay;
        this.gameTime = gameTime;
    }
}
