package com.ssafy.backend.controller;

import com.ssafy.backend.dto.ErrorDto;
import com.ssafy.backend.dto.LoginDto;
import com.ssafy.backend.dto.TokenDto;
import com.ssafy.backend.jwt.JwtFilter;
import com.ssafy.backend.jwt.TokenProvider;
import com.ssafy.backend.redis.RedisService;
import com.ssafy.backend.service.CustomUserDetailsService;
import com.ssafy.backend.service.TokenService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final TokenProvider tokenProvider;
    private final TokenService tokenService;
    private final RedisService redisService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisTemplate<String, String> redisTemplate;
    private final CustomUserDetailsService customUserDetailsService;

    public AuthController(TokenProvider tokenProvider, TokenService tokenService, RedisService redisService, AuthenticationManagerBuilder authenticationManagerBuilder, RedisTemplate redisTemplate, CustomUserDetailsService customUserDetailsService) {
        this.tokenProvider = tokenProvider;
        this.tokenService = tokenService;
        this.redisService = redisService;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.redisTemplate = redisTemplate;
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("/api/v1/login")
    public ResponseEntity<?> authorize(@Valid @RequestBody LoginDto loginDto) {

        Authentication authentication;
        // authentication 얻기
        try{
            authentication = tokenProvider.createAuthenticate(loginDto.getUserEmail(), loginDto.getUserPassword());
        }catch(BadCredentialsException e){
            return new ResponseEntity<ErrorDto>(new ErrorDto(401,"아이디 또는 비밀번호가 일치하지 않습니다"),HttpStatus.UNAUTHORIZED);
        }

        // access token, refresh token 만들기 0726
        String accessToken = tokenService.createAccessToken(authentication);
        String refreshToken = tokenService.createRefreshToken(authentication);

        //userEmail을 key 값으로 refreshToken을 value로 설정
        redisService.setValues(loginDto.getUserEmail(),refreshToken);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + accessToken + " " + refreshToken);

        return new ResponseEntity<TokenDto>(new TokenDto(accessToken, refreshToken), httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/api/v1/re-issue")
    public ResponseEntity<?> reIssue(HttpServletRequest request) {
        
        String userEmail = tokenService.getUserEmailFromToken(request);
        // 사용자 정보가 토큰에 없는 경우
        System.out.println(userEmail);
        if (userEmail.equals("null")) {
            return new ResponseEntity<String>("존재하지 않는 사용자입니다.",HttpStatus.OK);
        }

        //사용자가 있지만 해당 사용자의 refresh 토큰이 유효하지 않다면 로그아웃 처리
        if(!tokenService.checkRefreshToken(userEmail)){
            redisService.deleteValues(userEmail); //refresh 토큰 삭제
            return new ResponseEntity<String>("세션이 만료되어 로그아웃 되었습니다",HttpStatus.OK);
        }

        // 403이 발생한 경우 -> true 리턴. 발생한 경우에만 토큰 발급함
        //아래는 발생하지 않은 경우 예외 처리임.
        //아직 유효한 토큰인데 접근한 경우
        //우리와 다른 시크릿 키를 사용해서 권한이 없는경우?(이메일로 jwt위조한 경우?) 등
        if(!tokenService.checkAccessToken(request)){
            // accessToken을 블랙 리스트로 등록 -> 해당 토큰이 유효기간이 남았으니 이걸로 뭔가를 못하도록 막음
            tokenService.setBlackList(request);
            redisService.deleteValues(userEmail);
            return new ResponseEntity<String>("잘못된 접근방식으로 로그아웃 합니다",HttpStatus.OK);
        }


        String accessToken = tokenService.reIssueAccessToken(userEmail);
//        String refreshToken = redisService.getValues(userEmail);
        // re-issue는 리프레시 토큰은 살아있고 access token 재발급을 위한 것이므로 access Token만 재발급
        TokenDto responseDto = TokenDto.builder().token(accessToken).build();

        return new ResponseEntity<TokenDto>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/api/v1/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // 3. Redis 에서 해당 User email 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.

        if(redisService.getValues(authentication.getName()) != null){
            redisService.deleteValues(authentication.getName());
        }
        // accessToken을 블랙 리스트로 등록
        tokenService.setBlackList(request);

        return new ResponseEntity<String>("로그아웃 되었습니다",HttpStatus.OK);
    }



}