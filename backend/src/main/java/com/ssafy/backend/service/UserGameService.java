package com.ssafy.backend.service;

import com.ssafy.backend.dto.UserGameDto;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.mapper.GameMapper;
import com.ssafy.backend.repository.GameRepository;
import com.ssafy.backend.repository.UserGameInfo;
import com.ssafy.backend.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserGameService {
    private final UserGameInfo UserGameInfo;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    public UserGameService(UserGameInfo UserGameInfo, UserRepository userRepository, GameRepository gameRepository) {
        this.UserGameInfo = UserGameInfo;
        this.userRepository = userRepository;
        this.gameRepository = gameRepository;
    }

    // game_id + user_id 로 해당 게임 정보를 찾아옴
    public UserGameDto getUserGame(Long userId, Long gameId){
        UserGameDto userGame = UserGameInfo.getUserGameInfo(userId,gameId);

        if(userGame != null){
            return userGame;
        }else{
            return null;
        }
    }

    public List<GameMapper> myGameInfo(int start, int end, String userEmail){
        return gameRepository.getUserGames(PageRequest.of(start, end), userEmail);
    }
}
