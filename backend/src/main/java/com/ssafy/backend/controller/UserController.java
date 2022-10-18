package com.ssafy.backend.controller;

import com.ssafy.backend.dto.ErrorDto;
import com.ssafy.backend.dto.UserDto;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.repository.UserRepository;
import com.ssafy.backend.service.UserService;
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
        User user = userService.signup(userDto);
        if(user != null){
            return ResponseEntity.ok(user);
        }else{
            return ResponseEntity.ok(new ErrorDto(200,"이미 가입된 이메일입니다."));
        }
    }

//    @GetMapping("/test")
//    public ResponseEntity<?> test(){
//        return ResponseEntity.ok("tlqkf");
//    }

}