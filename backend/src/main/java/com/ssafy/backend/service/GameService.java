package com.ssafy.backend.service;

import com.ssafy.backend.entity.Game;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.UserGame;
import com.ssafy.backend.repository.GameRepository;
import com.ssafy.backend.repository.UserGameRepository;
import com.ssafy.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
public class GameService {
    private final GameRepository gameRepository;
    private final UserGameRepository userGameRepository;
    private final UserRepository userRepository;

    public GameService(GameRepository gameRepository, UserGameRepository userGameRepository, UserRepository userRepository) {
        this.gameRepository = gameRepository;
        this.userGameRepository = userGameRepository;
        this.userRepository = userRepository;
    }

    @Transactional
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
            gameRepository.save(game);

            List<HashMap<String, Object>> userData = (List<HashMap<String, Object>>) param.get("userData");

            for (int index = 0; index < userData.size(); index++){
                User user = userRepository.findUserByUserId(Long.parseLong((String) userData.get(index).get("userID")));
                //todo 해당 유저의 정보들 추가적으로 계산하는 로직 필요
                System.out.println("user" + user);
                System.out.println("game" + game);
                System.out.println("udostance" + Float.parseFloat((String) userData.get(index).get("userDistance")));
                UserGame userGame = UserGame.builder()
                        .game(game)
                        .user(user)
                        // todo 유저 정보 추가적으로 입력 필요
                        .userDistance(Float.parseFloat((String) userData.get(index).get("userDistance")))
                        .build();
                userGameRepository.save(userGame);
            }

            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }
}
