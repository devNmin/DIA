package com.ssafy.backend.repository;

import com.ssafy.backend.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserInfoRepository extends JpaRepository<UserInfo, String> {
    UserInfo findUserInfoByUser(Long userId);

    List<UserInfo> findUserInfoByUserNameContains(String name);
}
