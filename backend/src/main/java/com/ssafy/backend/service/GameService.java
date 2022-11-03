package com.ssafy.backend.service;

import com.ssafy.backend.dto.GameDto;
import com.ssafy.backend.entity.Game;
import com.ssafy.backend.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class GameService {
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public boolean newGame(HashMap<String, Object> param){
        try {
            Game game = Game.builder()
                    .gameYear((int)param.get("gameYear"))
                    .gameMonth((int)param.get("gameMonth"))
                    .gameDay((int)param.get("gameDay"))
                    .gameTime((int)param.get("gameTime"))
                    .gameVideo((String)param.get("gameVideo"))
                    .gameXY(param.get("gameXY").toString())
                    .build();
            System.out.println(gameRepository.save(game).getGameId());
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }
}
