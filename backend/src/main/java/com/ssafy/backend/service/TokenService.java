package com.ssafy.backend.service;

import com.ssafy.backend.entity.Authority;
import com.ssafy.backend.entity.User;
import com.ssafy.backend.jwt.TokenProvider;
import com.ssafy.backend.redis.RedisService;
import com.ssafy.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Iterator;
import java.util.concurrent.TimeUnit;

@Service
public class TokenService {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final long accessTokenValidityInMilliseconds;
    private final long refreshTokenValidityInMilliseconds;

    private final RedisService redisService;

    public static final String AUTHORIZATION_HEADER = "Authorization";

    public TokenService(TokenProvider tokenProvider, UserRepository userRepository, RedisService redisService){

        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.accessTokenValidityInMilliseconds = 1000L * 60 * 60 * 24; //3m
        this.refreshTokenValidityInMilliseconds = 1000L * 60 * 60 * 24 * 14; // 14d
        this.redisService = redisService;
    }

    // AccessToken 생성
    public String createAccessToken(Authentication authentication){
        String userRole = tokenProvider.getAuthorities(authentication);
        return tokenProvider.createToken(authentication.getName(), userRole, this.accessTokenValidityInMilliseconds);
    }

    // RefreshToken 생성
    public String createRefreshToken(Authentication authentication){
        return tokenProvider.createRefreshToken(refreshTokenValidityInMilliseconds);
    }

    //redis에 저장된 refresh token 만료 여부
    public boolean checkRefreshToken(String userEmail){
        return tokenProvider.checkRefreshToken(userEmail);
    }

    public boolean checkAccessToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        String token = null;
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            token = bearerToken.substring(7);
        }

        //토큰이 있다면 유효성 검사후 결과 리턴
        if(tokenProvider.checkUnauthorize(token)){
            return true; //만료되어 403애러가 발생한 경우
        }else{
            return false; //만료되지 않아 403 에러가 발생하지 않은 경우
        }
    }

    public String reIssueAccessToken(String userEmail) {
        User user = userRepository.findUserByUserEmail(userEmail);

        StringBuilder userRole = new StringBuilder();

        for (Authority a: user.getAuthorities()) {
            userRole.append(a.getAuthorityName());
        }

        return tokenProvider.createToken(userEmail, userRole.toString(), this.accessTokenValidityInMilliseconds);

    }

    public String getUserEmailFromToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        String token = null;
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            token = bearerToken.substring(7);
        }

        if(token.equals(null)){
            return token;
        }

        return tokenProvider.getUserEmail(token);
    }

    //header token
    public String getToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        String token = null;
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            token = bearerToken.substring(7);
        }

        return token;
    }

    public void setBlackList(HttpServletRequest request){
        String token = getToken(request);

        Date expiration = tokenProvider.getExpiration(token);
        Date now = new Date();

        //expiration이 끝나는 시간이므로 현재 시간을 빼주어야 남은 시간이 설정됨
        redisService.setValues(token,"logout",expiration.getTime()-now.getTime(), TimeUnit.MILLISECONDS);

    }
}