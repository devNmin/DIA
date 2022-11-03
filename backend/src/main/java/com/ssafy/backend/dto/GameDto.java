package com.ssafy.backend.dto;

import lombok.*;

import javax.persistence.Column;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GameDto {
    private int gameYear;
    private int gameMonth;
    private int gameDay;
    private int gameTime;
    private String gameVideo;
    private String gameXY;
}
