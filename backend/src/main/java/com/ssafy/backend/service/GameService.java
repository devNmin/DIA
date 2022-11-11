package com.ssafy.backend.service;

import com.ssafy.backend.entity.Game;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.UserGame;
import com.ssafy.backend.entity.UserInfo;
import com.ssafy.backend.repository.GameRepository;
import com.ssafy.backend.repository.UserGameInfo;
import com.ssafy.backend.repository.UserInfoRepository;
import com.ssafy.backend.repository.UserRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class GameService {
    private final GameRepository gameRepository;
    private final UserGameInfo UserGameInfo;
    private final UserRepository userRepository;

    private final UserInfoRepository userInfoRepository;

    public GameService(GameRepository gameRepository, UserGameInfo UserGameInfo, UserRepository userRepository, UserInfoRepository userInfoRepository) {
        this.gameRepository = gameRepository;
        this.UserGameInfo = UserGameInfo;
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
    }

//    @Transactional
    public boolean newGame(HashMap<String, Object> param){
        try {
            if(param.get("gameXY") == null ){
                Game game = Game.builder()
                        .gameYear((int)param.get("gameYear"))
                        .gameMonth((int)param.get("gameMonth"))
                        .gameDay((int)param.get("gameDay"))
                        .gameTime((int)param.get("gameTime"))
                        .build();
                gameRepository.save(game);
            }else{
                Game game = Game.builder()
                        .gameYear((int)param.get("gameYear"))
                        .gameMonth((int)param.get("gameMonth"))
                        .gameDay((int)param.get("gameDay"))
                        .gameTime((int)param.get("gameTime"))
//                        .gameVideo(param.get("gameVideo") == null ? null: (String)param.get("gameVideo"))
                        .gameXY(param.get("gameXY") == null ? null : param.get("gameXY").toString())
                        .build();
                gameRepository.save(game);

                HashMap<String,List> userV = getUserStat((HashMap<String, List>) param.get("gameXY"));

                List<HashMap<String, Object>> userData = (List<HashMap<String, Object>>) param.get("userData");

                for (int index = 0; index < userData.size(); index++){
                    String userId = (String) userData.get(index).get("userID");
                    System.out.println(userId);
                    if(userId == null){
                        return false;
                    }

                    User user = userRepository.findUserByUserId(Long.parseLong(userId));
                    UserInfo userInfo = userInfoRepository.findUserInfoByUser_UserId(user.getUserId());
                    //todo 해당 유저의 정보들 추가적으로 계산하는 로직 필요
                    System.out.println("user" + user);
                    System.out.println("game" + game);
                    System.out.println("udostance" + Float.parseFloat((String) userData.get(index).get("userDistance")));
                    UserGame userGame = UserGame.builder()
                            .game(game)
                            .user(user)
                            // todo 유저 정보 추가적으로 입력 필요
                            .userPhysical((userInfo.getUserPhysical()))
                            .userMaxSpeed(Float.parseFloat(((Double)userV.get(userId).get(0)).toString()))
                            .userSpeed(Float.parseFloat(((Double)userV.get(userId).get(1)).toString()))
                            .userDistance(Float.parseFloat((String) userData.get(index).get("userDistance")))
                            .build();
                    UserGameInfo.save(userGame);
                }
            }
            return true;
        }catch (Exception e){
            System.out.println(e);
            e.printStackTrace();
            return false;
        }
    }

    public HashMap<String,List> getUserStat(HashMap<String,List> param){
        HashMap<String,List> returnData = new HashMap<>();

        double lastX = 0.0f;
        double lastY = 0.0f;
        double nowX = 0.0f;
        double nowY = 0.0f;

        int defCnt = 0;
        int attCnt = 0;
        boolean isLeft = false;
        boolean isRight = false;


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

            //왼쪽에 있는 경우 왼쪽이 우리진영
            if(lastX < 1180/2*fixelX){
                isLeft = true;
            }else{
                isRight = true;
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

                //속력이 5km/h 보다 낮으면 걷는 속도. 걷는 속도보다 빨라야 무언가를 했다고 판단
                if(nowV/1000*360 > 5){
                    if(isLeft){ //왼쪽이 우리진영일때
                        if(nowX<1180/2*fixelX){
                            defCnt++;
                        }else{
                            attCnt++;
                        }
                    }else if(isRight){ //오른쪽이 우리진영일때
                        if(nowX<1180/2*fixelX){
                            attCnt++;
                        }else{
                            defCnt++;
                        }
                    }
                }

                maxV = Math.max(nowV,maxV);
                totalV += nowV;
                totalCnt++;

                lastX = nowX;
                lastY = nowY;

            }
            maxV = maxV/1000*360;
//            System.out.println("MaxV: "+maxV);
//            System.out.println("avg: "+totalV/totalCnt);
            System.out.println("defCnt: "+defCnt+ ", attCnt: "+attCnt);
            ArrayList<Double> vData = new ArrayList<>();
            vData.add(maxV); //최대 속도가 0
            vData.add(totalV/totalCnt); //평균 속도가 1
            returnData.put(userKey,vData);
        }

        return returnData;
    }

    // 해당 게임의 해당 유저의 좌표 정보 얻기
    public JSONObject getGame_gameXYByGameId(Long userId, Long gameId){
        try{
            String gameXY = gameRepository.getGame_gameXYByGameId(gameId);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse( gameXY );
            JSONObject jsonObj = (JSONObject) obj;
            JSONObject tmp = new JSONObject();
            tmp.put("points", jsonObj.get(Long.toString(userId).toString()));
            return tmp;
        }catch (Exception e){
            return null;
        }
    }
}
