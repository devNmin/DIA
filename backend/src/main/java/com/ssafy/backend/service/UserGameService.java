package com.ssafy.backend.service;

import com.ssafy.backend.dto.UserGameDto;
import com.ssafy.backend.entity.UserGame;
import com.ssafy.backend.repository.UserGameRepository;
import org.springframework.stereotype.Service;

@Service
public class UserGameService {
    private final UserGameRepository userGameRepository;

    public UserGameService(UserGameRepository userGameRepository) {
        this.userGameRepository = userGameRepository;
    }

    // game_id + user_id 로 해당 게임 정보를 찾아옴
    public UserGameDto getUserGame(Long userId, Long gameId){
        UserGameDto userGame = userGameRepository.getUserGameInfo(userId,gameId);

        if(userGame != null){
            return userGame;
        }else{
            return null;
        }
    }
}
