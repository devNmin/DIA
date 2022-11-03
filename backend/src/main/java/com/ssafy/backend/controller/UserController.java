package com.ssafy.backend.controller;

import com.ssafy.backend.dto.ResponseDto;
import com.ssafy.backend.dto.UserLoginDto;
import com.ssafy.backend.dto.UserWearDto;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.entity.UserInfo;
import com.ssafy.backend.service.UserInfoService;
import com.ssafy.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;
    private final UserInfoService userInfoService;

    public UserController(UserService userService, UserInfoService userInfoService){
        this.userService=userService;
        this.userInfoService = userInfoService;
    }

    //회원가입 controller
    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @Valid @RequestBody UserLoginDto userLoginDto
    ){
        String user = userService.signup(userLoginDto);

        //todo 데이터 입력 예외처리 코드 추가

        if(user.equals("ok")){
            return ResponseEntity.ok(new ResponseDto(200,"회원가입 성공"));
        }else if(user.equals("email")){
            return ResponseEntity.ok(new ResponseDto(409,"이미 가입된 이메일입니다"));
        }else{
            return ResponseEntity.ok(new ResponseDto(403,"비밀번호가 일치하지 않습니다."));
        }
    }

    @GetMapping("/email/check/{email}")
    public ResponseEntity<?> emailCheck(
            @PathVariable("email") String email
    ){
        boolean check = userService.emailCheck(email);

        if(check){
            return ResponseEntity.ok(new ResponseDto(200,"사용 가능한 이메일 입니다"));
        }

        return ResponseEntity.ok(new ResponseDto(409,"이미 가입된 이메일입니다"));
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok(new ResponseDto(409,"이미 가입된 이메일입니다"));
    }

    @GetMapping("/check/code/{code}")
    public ResponseEntity<?> codeCheck(
            @PathVariable("code") String code
    ){
        long numCode = Long.parseLong(code);
        User user = userService.findById(numCode);
        UserInfo userInfo = userInfoService.findByUserId(numCode);

        System.out.println(user);
        if(user != null){
            UserWearDto userWearDto = UserWearDto.builder().
                    userCode(user.getUserId())
                    .userEmail(user.getUserEmail())
                    .userName(userInfo.getUserName())
                    .build();
            return new ResponseEntity<UserWearDto>(userWearDto,HttpStatus.OK);
        }else{
            return new ResponseEntity<ResponseDto>(new ResponseDto(404,"존재하지 않는 사용자입니다"),HttpStatus.NOT_FOUND);
        }
    }

}