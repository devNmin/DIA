package com.ssafy.backend.repository;

import com.ssafy.backend.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserInfoRepository extends JpaRepository<UserInfo, String> {
    UserInfo findUserInfoByUser_UserId(Long userId);

    List<UserInfo> findUserInfoByUserNameContains(String name);

    @Transactional
    @Modifying
    @Query("UPDATE UserInfo userinfo SET userinfo.userPfofileImage = :imageUrl where userinfo.user.userId = :id")
    int updateUserProfile( @Param(value="id") Long id,@Param(value="imageUrl") String imageUrl);
}
