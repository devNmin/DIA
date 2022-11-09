package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PagenationDto {
    private int start;
    private int end;
    private String userEmail;
}
