package com.ssafy.backend.controller;

import com.ssafy.backend.dto.ImageDto;
import com.ssafy.backend.dto.ProfileUrlDto;
import com.ssafy.backend.dto.ResponseDto;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.UserInfo;
import com.ssafy.backend.repository.UserInfoRepository;
import com.ssafy.backend.repository.UserRepository;
import com.ssafy.backend.service.ImageService;
import com.ssafy.backend.service.TokenService;
import com.ssafy.backend.service.UserInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {

    private final ImageService imageService;
    private final TokenService tokenService;
    private final UserInfoRepository userInfoRepository;
    private final UserRepository userRepository;
    private final UserInfoService userInfoService;

    public ImageController(ImageService imageService, TokenService tokenService, UserInfoRepository userInfoRepository, UserRepository userRepository, UserInfoService userInfoService) {
        this.imageService = imageService;
        this.tokenService = tokenService;
        this.userInfoRepository = userInfoRepository;
        this.userRepository = userRepository;
        this.userInfoService = userInfoService;
    }

    @PostMapping("/profile")
    public ResponseEntity<?> setProfile(
            HttpServletRequest request,
            @Valid @RequestParam("files")List<MultipartFile> files
            )throws Exception{
        String userEmail = tokenService.getUserEmailFromToken(request);
        User user = userRepository.findUserByUserEmail(userEmail);

        List<String> list = imageService.addProfile(userEmail,files,0);

        if(list.isEmpty()){
            return ResponseEntity.ok(new ResponseDto(404,"이미지가 없습니다"));
        }else{
            for(String imageUrl : list){
                Long id = user.getUserId();
                userInfoRepository.updateUserProfile(id,imageUrl);
            }
            return ResponseEntity.ok(new ImageDto(list));
        }

    }



    @GetMapping("/profile/link")
    public ResponseEntity<?> getProfileLink(HttpServletRequest request) {
        String userEmail = tokenService.getUserEmailFromToken(request);
        User user = userRepository.findUserByUserEmail(userEmail);
        System.out.println(user.getUserId());
        UserInfo userInfo = userInfoRepository.findUserInfoByUser_UserId(user.getUserId());
        String imageUrl = userInfo.getUserPfofileImage();

        if(imageUrl == null){
            return ResponseEntity.ok(new ResponseDto(404,"프로필 사진이 없습니다."));
        }else{
            return ResponseEntity.ok(new ProfileUrlDto(imageUrl));
        }



    }
}
