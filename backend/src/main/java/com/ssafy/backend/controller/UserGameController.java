package com.ssafy.backend.controller;

import com.ssafy.backend.dto.PagenationDto;
import com.ssafy.backend.dto.ResponseDto;
import com.ssafy.backend.dto.UserGameDto;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.UserGame;
import com.ssafy.backend.mapper.GameMapper;
import com.ssafy.backend.repository.UserGameInfo;
import com.ssafy.backend.repository.UserInfoRepository;
import com.ssafy.backend.repository.UserRepository;
import com.ssafy.backend.service.GameService;
import com.ssafy.backend.service.TokenService;
import com.ssafy.backend.service.UserGameService;
import org.json.simple.JSONObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/api/v1/usergame")
public class UserGameController {
    private final UserGameService userGameService;
    private final GameService gameService;
    private final UserRepository userRepository;
    private final UserGameInfo UserGameInfo;
    private final UserInfoRepository userInfoRepository;
    private final TokenService tokenService;

    public UserGameController(UserGameService userGameService, GameService gameService, UserRepository userRepository, UserGameInfo UserGameInfo, UserInfoRepository userInfoRepository, TokenService tokenService) {
        this.userGameService = userGameService;
        this.gameService = gameService;
        this.userRepository = userRepository;
        this.UserGameInfo = UserGameInfo;
        this.userInfoRepository = userInfoRepository;
        this.tokenService = tokenService;
    }

    // 원하는 페이지 내의 자신이 참여한 게임 정보를 받아오는 api
    @PostMapping("/myRecentGameInfo")
    public ResponseEntity<?> myRecentGameInfo(
            HttpServletRequest request,
            @RequestBody PagenationDto pagenationDto
    ){
        String userEmail = tokenService.getUserEmailFromToken(request);
        List<GameMapper> gameMapper = userGameService.myGameInfo(pagenationDto.getStart(),pagenationDto.getEnd(),userEmail);
//        List<GameMapper> gameMapper = userGameService.myGameInfo(pagenationDto.getStart(),pagenationDto.getEnd(), pagenationDto.getUserEmail());
        return ResponseEntity.ok(gameMapper);
    }

    // todo  5경기 평균 점수 구하기 - 백분율 점수 변경 필요
    @PostMapping("/test")
    public ResponseEntity<?> test(
            HttpServletRequest request,
            @RequestBody PagenationDto pagenationDto
    ){
        String userEmail = tokenService.getUserEmailFromToken(request);
        User user = userRepository.findUserByUserEmail(userEmail);
        List<UserGame> userGameList = (UserGameInfo.getMyGameInfo(PageRequest.of(pagenationDto.getStart(),pagenationDto.getEnd()), user.getUserId()));
        double avgDistance = 0;
        double avgAttack = 0;
        double avgDefence = 0;
        double avgStamina = 0;
        double avgSpeed = 0;
        double avgPhysical = userInfoRepository.findUserInfoByUser_UserId(user.getUserId()).getUserPhysical();

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

    @GetMapping("/info/{gameId}")
    public ResponseEntity<?> getUserGameInfo(
            HttpServletRequest request,
            @PathVariable("gameId") Long gameId
    ){
        String userEmail = tokenService.getUserEmailFromToken(request);
        User user = userRepository.findUserByUserEmail(userEmail);

        UserGameDto userGameDto = userGameService.getUserGame(user.getUserId(),gameId);
//        UserGameDto userGameDto = userGameService.getUserGame(userId,gameId);
        System.out.println(userGameDto.toString());

        if(userGameDto != null){
            return ResponseEntity.ok(userGameDto);
//            return ResponseEntity.ok(new ResponseDto(200,"adfs"));
        }else{
            return ResponseEntity.ok(new ResponseDto(404,"없는 경기입니다"));
        }
    }

    // 해당 게임의 자신의 좌표 정보
    @GetMapping("/heatmapPoints/{gameId}")
    public ResponseEntity<?> heatmapPoints(
            HttpServletRequest request,
            @PathVariable("gameId") Long gameId
    ){
        try{
            String userEmail = tokenService.getUserEmailFromToken(request);
            User user = userRepository.findUserByUserEmail(userEmail);
//        System.out.println(gameService.getGame_gameXYByGameId(user.getUserId(), gameId));
            return ResponseEntity.ok(gameService.getGame_gameXYByGameId(user.getUserId(), gameId));
        }catch (Exception e){
            return ResponseEntity.ok(new ResponseDto(500, e.getMessage()));
        }
    }

}
