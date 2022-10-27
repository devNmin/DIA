package com.ssafy.backend.controller;

import com.ssafy.backend.dto.ResponseDto;
import com.ssafy.backend.dto.UserDto;
import com.ssafy.backend.dto.UserWearDto;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.repository.UserRepository;
import com.ssafy.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    private JavaMailSender mailSender;

    public UserController(UserService userService, UserRepository userRepository){
        this.userService=userService;
        this.userRepository = userRepository;
    }

    //회원가입 controller
    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @Valid @RequestBody UserDto userDto
    ){
        String user = userService.signup(userDto);

        if(user.equals("ok")){
            return ResponseEntity.ok(new ResponseDto(200,"회원가입 성공"));
        }else if(user.equals("email")){
            return ResponseEntity.ok(new ResponseDto(200,"이미 가입된 이메일입니다"));
        }else{
            return ResponseEntity.ok(new ResponseDto(200,"비밀번호가 일치하지 않습니다."));
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

        return ResponseEntity.ok(new ResponseDto(200,"이미 가입된 이메일입니다"));
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok(new ResponseDto(200,"이미 가입된 이메일입니다"));
    }

    @GetMapping("/check/code/{code}")
    public ResponseEntity<?> codeCheck(
            @PathVariable("code") String code
    ){
        long numCode = Long.parseLong(code);
        User user = userService.findById(numCode);
        System.out.println(user);
        if(user != null){
            UserWearDto userWearDto = UserWearDto.builder().userEmail(user.getUserEmail()).userName(user.getUserName()).build();
            return new ResponseEntity<UserWearDto>(userWearDto,HttpStatus.OK);
        }else{
            return new ResponseEntity<ResponseDto>(new ResponseDto(404,"존재하지 않는 사용자입니다"),HttpStatus.NOT_FOUND);
        }
    }

}