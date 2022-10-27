package com.ssafy.backend.service;

import com.ssafy.backend.dto.UserDto;
import com.ssafy.backend.entity.Authority;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,  PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public String signup(UserDto userDto){
        if(userRepository.findUserByUserEmail(userDto.getUserEmail()) != null){
//            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
            return "email";
        }

        //비밀번호 같으면 같지 않으면 에러 처리
        if(!userDto.getUserPassword().equals(userDto.getUserPassword2())){
            return "password";
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .userEmail(userDto.getUserEmail())
                .userPassword(passwordEncoder.encode(userDto.getUserPassword()))
                .userName(userDto.getUserName())
                .userAge(userDto.getUserAge())
                .authorities(Collections.singleton(authority))
                .build();

        userRepository.save(user);

        return "ok";
    }

    public boolean emailCheck(String email){
        //이미 가입된 이메일 체크 -> 있다면 false
        if(userRepository.findOneWithAuthoritiesByUserEmail(email).orElse(null) != null){
            return false;
        }
        return true;
    }

    public User findById(long pk){
        User user = userRepository.findUserByUserId(pk);

        if(user != null){
            return user;
        }else{
            return null;
        }
    }
}