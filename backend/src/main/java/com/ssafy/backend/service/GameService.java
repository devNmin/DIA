package com.ssafy.backend.service;

import com.ssafy.backend.dto.GameDto;
import com.ssafy.backend.entity.Game;
import com.ssafy.backend.repository.GameRepository;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public boolean newGame(GameDto gameDto){
        try {
            Game game = Game.builder()
                    .gameYear(gameDto.getGameYear())
                    .gameMonth(gameDto.getGameMonth())
                    .gameDay(gameDto.getGameDay())
                    .gameTime(gameDto.getGameTime())
                    .gameXY(gameDto.getGameXY())
                    .gameVideo(gameDto.getGameVideo())
                    .build();
            gameRepository.save(game);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
