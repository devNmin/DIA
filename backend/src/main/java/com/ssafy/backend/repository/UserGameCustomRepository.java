package com.ssafy.backend.repository;

import com.ssafy.backend.dto.UserGameDto;
import com.ssafy.backend.entity.UserGame;

public interface UserGameCustomRepository {
    UserGameDto getUserGameInfo(Long userId, Long gameId);
}
