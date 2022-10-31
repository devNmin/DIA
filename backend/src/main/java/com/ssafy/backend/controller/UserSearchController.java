package com.ssafy.backend.controller;

import com.ssafy.backend.entity.User;
import com.ssafy.backend.repository.UserRepository;
import com.ssafy.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
public class UserSearchController {
    private final UserRepository userRepository;

    public UserSearchController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> UserList(
            @PathVariable("name") String name
    ){
        List<User> userList = userRepository.findUserByUserNameContains(name);

        return ResponseEntity.ok(userList);
    }

}
