package com.ssafy.backend.controller;


import com.ssafy.backend.dto.GameDto;
import com.ssafy.backend.dto.ResponseDto;
import com.ssafy.backend.entity.Game;
import com.ssafy.backend.repository.GameRepository;
import com.ssafy.backend.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;

@Controller
@RequestMapping("/api/v1/game")
public class GameController {
    private final GameService gameService;
    private final GameRepository gameRepository;

    public GameController(GameService gameService, GameRepository gameRepository) {
        this.gameService = gameService;
        this.gameRepository = gameRepository;
    }

    @PutMapping("/newGame")
    public ResponseEntity<?> newGame(
            @RequestBody GameDto gameDto
    ){
        gameService.newGame(gameDto);
        return ResponseEntity.ok(new ResponseDto(200,"저장 성공"));
    }

    @PostMapping("/coordinate")
    public ResponseEntity<?> coordinate(
        @RequestBody HashMap<String, Object> param
    ){
        Game game = Game.builder()
                .gameXY(param.toString())
                .build();
        gameRepository.save(game);
        return ResponseEntity.ok(new ResponseDto(200,"저장 완료"));
    }
}
