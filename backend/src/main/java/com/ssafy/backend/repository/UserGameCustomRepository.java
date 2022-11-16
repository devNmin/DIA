package com.ssafy.backend.repository;

import com.ssafy.backend.dto.UserGameDto;
import com.ssafy.backend.entity.UserGame;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserGameCustomRepository {
    UserGameDto getUserGameInfo(Long userId, Long gameId);

    List<UserGameDto> getMyGameInfo(@Param(value="start")Integer start, @Param(value="end") Integer end , @Param(value="id") Long id);

}
