package com.ssafy.backend.controller;

import com.ssafy.backend.dto.ResponseDto;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.UserGame;
import com.ssafy.backend.repository.UserGameRepository;
import com.ssafy.backend.repository.UserRepository;
import com.ssafy.backend.service.UserGameService;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;

@Controller
@RequestMapping("/api/v1/usergame")
public class UserGameController {
    private final UserGameService userGameService;
    private final UserGameRepository userGameRepository;

    public UserGameController(UserGameService userGameService, UserGameRepository userGameRepository) {
        this.userGameService = userGameService;
        this.userGameRepository = userGameRepository;
    }

    @PostMapping("/myRecentGameInfo/{userId}")
    public ResponseEntity<?> myRecentGameInfo(
            @PathVariable("userId") String userId
    ){
        System.out.println(userGameRepository.getMyRecentFiveGame(PageRequest.of(0,5), Long.parseLong(userId)));
        return ResponseEntity.ok(new ResponseDto(200,"저장 완료"));
    }

}
