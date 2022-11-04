package com.ssafy.backend.controller;

import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.UserInfo;
import com.ssafy.backend.repository.UserInfoRepository;
import com.ssafy.backend.repository.UserRepository;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
public class UserSearchController {
    private final UserInfoRepository userInfoRepository;

    public UserSearchController(UserInfoRepository userInfoRepository){
        this.userInfoRepository = userInfoRepository;
    }

    // todo pathVariable -> requestbody로 변경 하기
    @PostMapping("/user")
    public ResponseEntity<?> UserList(
            @RequestBody HashMap<String, String> name
    ){
//        List<UserInfo> userList = userInfoRepository.ttt(name);
        List<UserInfo> userList = userInfoRepository.findUserInfoByUserNameContains(name.get("name"));

        List<JSONObject> result = new ArrayList<>();
        if (userList == null){
            System.out.println("null입니다.");
        }

        for (int index = 0; index < userList.size(); index++){
            JSONObject tmp = new JSONObject();
            tmp.put("userinfoId", userList.get(index).getUserinfoId());
            tmp.put("userId", userList.get(index).getUser().getUserId());
            tmp.put("userProfileImage", userList.get(index).getUserPfofileImage());
            tmp.put("userPosition", userList.get(index).getUserPosition());
            tmp.put("userAge", userList.get(index).getUserAge());
            tmp.put("userName", userList.get(index).getUserName());
            tmp.put("userEmail", userList.get(index).getUser().getUserEmail());
            tmp.put("userHeight", userList.get(index).getUserHeight());
            tmp.put("userWeight", userList.get(index).getUserWeight());
            result.add(tmp);
        }
        return ResponseEntity.ok(result);
    }
}
