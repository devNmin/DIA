package com.ssafy.backend.controller;

import com.ssafy.backend.dto.ResponseDto;
import com.ssafy.backend.dto.UserGameDto;
import com.ssafy.backend.entity.UserGame;
import com.ssafy.backend.repository.UserGameRepository;
import com.ssafy.backend.repository.UserInfoRepository;
import com.ssafy.backend.service.UserGameService;
import org.json.simple.JSONObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

import java.util.List;

@Controller
@RequestMapping("/api/v1/usergame")
public class UserGameController {
    private final UserGameService userGameService;
    private final UserGameRepository userGameRepository;
    private final UserInfoRepository userInfoRepository;

    public UserGameController(UserGameService userGameService, UserGameRepository userGameRepository, UserInfoRepository userInfoRepository) {
        this.userGameService = userGameService;
        this.userGameRepository = userGameRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @PostMapping("/myRecentGameInfo/{userId}")
    public ResponseEntity<?> myRecentGameInfo(
            @PathVariable("userId") String userId
    ){
        System.out.println(userGameRepository.getMyRecentFiveGame(PageRequest.of(0,5), Long.parseLong(userId)));
        return ResponseEntity.ok(new ResponseDto(200,"저장 완료"));
    }

    // todo  5경기 평균 점수 구하기 - 백분율 점수 변경 필요
    @GetMapping("/test/{userId}")
    public ResponseEntity<?> test(
            @PathVariable("userId") String userId
    ){
        List<UserGame> userGameList = (userGameRepository.getMyRecentFiveGame(PageRequest.of(0,5), Long.parseLong(userId)));
        double avgDistance = 0;
        double avgAttack = 0;
        double avgDefence = 0;
        double avgStamina = 0;
        double avgSpeed = 0;
        double avgPhysical = userInfoRepository.findUserInfoByUser_UserId(Long.parseLong(userId)).getUserPhysical();

        for (int index = 0; index < userGameList.size(); index++){
            if (userGameList.get(index).getUserAttack() != 0){
                avgAttack = ((double) (avgAttack + userGameList.get(index).getUserAttack())) /2;
            }
            if (userGameList.get(index).getUserDistance() != 0){
                avgDistance = ((double) (avgDistance + userGameList.get(index).getUserDistance())) /2;
            }
            if (userGameList.get(index).getUserDefence() != 0){
                avgDefence = ((double) (avgDefence + userGameList.get(index).getUserDefence())) /2;
            }
            if (userGameList.get(index).getUserStamina() != 0){
                avgStamina = ((double) (avgStamina + userGameList.get(index).getUserStamina())) /2;
            }
            if (userGameList.get(index).getUserSpeed() != 0){
                avgSpeed = ((double) (avgSpeed + userGameList.get(index).getUserSpeed())) /2;
            }
        }

        JSONObject tmp = new JSONObject();
        //todo 점수화 필요
        tmp.put("avgDistance", avgDistance);
        tmp.put("avgAttack", avgAttack);
        tmp.put("avgDefence", avgDefence);
        tmp.put("avgStamina", avgStamina);
        tmp.put("avgSpeed", avgSpeed);
        tmp.put("avgPhysical", avgPhysical);
        //todo 실제 측정값 추가 필요
        tmp.put("realDistance", avgDistance);
        tmp.put("realAttack", avgAttack);
        tmp.put("realDefence", avgDefence);
        tmp.put("realStamina", avgStamina);
        tmp.put("realSpeed", avgSpeed);
        tmp.put("realPhysical", avgPhysical);


        return ResponseEntity.ok(tmp);
    }

    @GetMapping("/info/{userId}/{gameId}")
    public ResponseEntity<?> getUserGameInfo(
            @PathVariable("userId") Long userId, @PathVariable("gameId") Long gameId
    ){
        UserGameDto userGameDto = userGameService.getUserGame(userId,gameId);
        System.out.println(userGameDto.toString());

        if(userGameDto != null){
            return ResponseEntity.ok(userGameDto);
//            return ResponseEntity.ok(new ResponseDto(200,"adfs"));
        }else{
            return ResponseEntity.ok(new ResponseDto(404,"없는 경기입니다"));
        }
    }
}
