package com.ssafy.backend.service;

import com.ssafy.backend.entity.Game;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.UserGame;
import com.ssafy.backend.repository.GameRepository;
import com.ssafy.backend.repository.UserGameRepository;
import com.ssafy.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

//    @Transactional
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

            HashMap<String,List> userV = getUserV((HashMap<String, List>) param.get("gameXY"));

            List<HashMap<String, Object>> userData = (List<HashMap<String, Object>>) param.get("userData");


            for (int index = 0; index < userData.size(); index++){
                String userId = (String) userData.get(index).get("userID");
                User user = userRepository.findUserByUserId(Long.parseLong(userId));
                //todo 해당 유저의 정보들 추가적으로 계산하는 로직 필요

                UserGame userGame = UserGame.builder()
                        .game(game)
                        .user(user)
                        // todo 유저 정보 추가적으로 입력 필요
                        .userMaxSpeed((float)(userV.get(userId).get(0)))
                        .userSpeed((float)(userV.get(userId).get(1)))
                        .userDistance(Float.parseFloat((String) userData.get(index).get("userDistance")))
                        .build();
                userGameRepository.save(userGame);
            }

            return true;
        }catch (Exception e){
            System.out.println(e);
            e.printStackTrace();
            return false;
        }
    }

    public HashMap<String,List> getUserV(HashMap<String,List> param){
        HashMap<String,List> returnData = new HashMap<>();

        double lastX = 0.0f;
        double lastY = 0.0f;
        double nowX = 0.0f;
        double nowY = 0.0f;

        for(String userKey : param.keySet()){ //각 선수 만큼 반복
            double dx = 0;
            double dy = 0; //거리 값
            double distance = 0; //이전좌표에서 현재 좌표까지 거리
            double time = 0.005; //임시 초
            double nowV = 0; //현재 속도
            double maxV = 0; //최고 속도
            double totalV = 0; //속도 합
            int totalCnt = 0; //전체 개수
            double fixelX = (double)40/(double)1180;
            double fixelY = (double)20/(double)656;

            //풋살장 가로 40 세로 20
            //50 밀리세컨드 10^-3 -> 0.005초

            List userXYInfo = param.get(userKey);
            try {
                lastX = (double)((List)userXYInfo.get(0)).get(0)*fixelX;
                lastY = (double)((List)userXYInfo.get(0)).get(1)*fixelY;
            }catch (IndexOutOfBoundsException e){
                continue;
            }

            for(Object nowInfo : userXYInfo){ //각 선수들의 좌표값 만큼 반복
                List nowXY = (List)nowInfo;
                nowX = (double)nowXY.get(0)*fixelX;
                nowY = (double)nowXY.get(1)*fixelY;
//                System.out.println("nowX: "+nowX + " , nowY: "+nowY);
                dx = Math.abs(nowX-lastX);
                dy = Math.abs(nowY-lastY);
                distance = Math.sqrt(dx*dx + dy*dy);
                nowV = distance/time;
                if(nowV>=44){
                    continue;
                }
                maxV = Math.max(nowV,maxV);
                totalV += nowV;
                totalCnt++;

                lastX = nowX;
                lastY = nowY;

            }
            maxV = maxV/1000*360;
            System.out.println("MaxV: "+maxV);
            System.out.println("avg: "+totalV/totalCnt);
            ArrayList<Double> vData = new ArrayList<>();
            vData.add(maxV); //최대 속도가 0
            vData.add(totalV/totalCnt); //평균 속도가 1
            returnData.put(userKey,vData);
        }

        return returnData;
    }
}
