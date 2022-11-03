package com.ssafy.backend.controller;

import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.UserInfo;
import com.ssafy.backend.repository.UserInfoRepository;
import com.ssafy.backend.repository.UserRepository;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
public class UserSearchController {
    private final UserInfoRepository userInfoRepository;

    public UserSearchController(UserInfoRepository userInfoRepository){
        this.userInfoRepository = userInfoRepository;
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> UserList(
            @PathVariable("name") String name
    ){
//        List<UserInfo> userList = userInfoRepository.ttt(name);
        List<UserInfo> userList = userInfoRepository.findUserInfoByUserNameContains(name);

        List<JSONObject> result = new ArrayList<>();
        if (userList == null){
            System.out.println("null입니다.");
        }

        for (int index = 0; index < userList.size(); index++){
            JSONObject tmp = new JSONObject();
            tmp.put("userinfoId", userList.get(index).getUserinfoId());
            tmp.put("userId", userList.get(index).getUser().getUserId());
            tmp.put("userPfofileImage ", userList.get(index).getUserPfofileImage());
            tmp.put("userPosition", userList.get(index).getUserPosition());
            tmp.put("userAge", userList.get(index).getUserAge());
            tmp.put("userName", userList.get(index).getUserName());
            tmp.put("userEmail", userList.get(index).getUser().getUserEmail());
            result.add(tmp);
        }
        return ResponseEntity.ok(result);
    }
}
