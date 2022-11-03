package com.ssafy.backend.service;

import com.ssafy.backend.entity.UserInfo;
import com.ssafy.backend.repository.UserInfoRepository;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {
    private final UserInfoRepository userInfoRepository;

    public UserInfoService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    public UserInfo findByUserId(long pk){
        UserInfo userInfo = userInfoRepository.findUserInfoByUser_UserId(pk);
        if(userInfo != null){
            return userInfo;
        }else {
            return null;
        }
    }


}
