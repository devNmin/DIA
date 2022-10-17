package com.ssafy.backend.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.dto.TokenDto;
import com.ssafy.backend.redis.RedisService;
import com.ssafy.backend.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class TokenProvider implements InitializingBean {

    private final String secret;
    private Key key;
    private final long tokenValidityInMilliseconds;

    private static final String AUTHORITIES_KEY = "auth";
    private final UserRepository userRepository;

    private final RedisService redisService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder; // 0726 refactoring
    // 생성자
    // application.yml에서 데이터 값 가져오기
    // jwt secret 및 유효기간 초기화
    public TokenProvider(
            @Value("${jwt.secret}") String secret, //jwt secret
            @Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds, //토큰 유효기간
            UserRepository userRepository, RedisService redisService, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.secret = secret;
        this.tokenValidityInMilliseconds = tokenValidityInSeconds *1000;
        this.userRepository = userRepository;
        this.redisService = redisService;
        this.authenticationManagerBuilder = authenticationManagerBuilder; // 0726 refactoring

    }

    // InitializingBean에 필수적인 메소드
    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes); // HMAC-SHA 이거 써서 암호화 시킴
    }

    // 토큰 생성
    public String createToken(String userEmail, String userRole, long tokenValidtime){

        long now = (new Date()).getTime(); //현재 시간 가져오고
        Date validity = new Date(now + tokenValidtime); // 토큰의 유효기간

        return Jwts.builder()
                .setHeaderParam("type", "jwt")
                .setSubject(userEmail) // 클레임중 subject 클레임 이름 생성
                .claim(AUTHORITIES_KEY, userRole)  // payload에 들어갈 정보 <key, value>
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }
    public String createRefreshToken(long tokenValidtime){
        long now = (new Date()).getTime(); //현재 시간 가져오고
        Date validity = new Date(now + tokenValidtime); // 토큰의 유효기간

        return Jwts.builder()
                .setHeaderParam("type", "jwt")
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public String getAuthorities(Authentication authentication){
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        return authorities;
    }



    // authenticationToken 생성 0726
    public Authentication createAuthenticate(String userEmail, String userPassword){
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userEmail, userPassword);

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authentication;
    }

    // authentication 객체 리턴
    public Authentication getAuthentication(String token){
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    // 토큰의 유효성 검증 수행
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
//            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
//            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
//            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    //redis에 토큰이 로그아웃 처리되어 블랙리스트 등록되었는지 확인
    public boolean isNotLogin(String token){
        //null이 아니면 토큰이 들어있는 것임 -> 블랙리스트 등록된 것
        if(redisService.getValues(token)!=null){
            return false;
        }

        //블랙리스트 등록되지 않아 사용할 수 있는 토큰큰
        return true;
    }

    public boolean checkRefreshToken(String userId) {
        String refreshToken = redisService.getValues(userId);
        //유효한 토큰인 경우
        if (validateToken(refreshToken)) {
            return true;
        }else{ //유효하지 않은 토큰인 경우
            return false;
        }
    }

    public Date getExpiration(String token){
        Date expiration = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration;
    }

    public String getUserEmail(String token)  {
        String[] check = token.split("\\.");
        Base64.Decoder decoder = Base64.getDecoder();
        String payload = new String(decoder.decode(check[1]));
        ObjectMapper mapper = new ObjectMapper();
        try{
            Map<String,Object> returnMap = mapper.readValue(payload,Map.class);
            return (String)returnMap.get("sub");
        }catch(JsonProcessingException e){
            return null;
        }
    }

    //만료기간이 지났는지만 확인인
   public boolean checkUnauthorize(String token){
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            return true; //403인 경우만 true
        }
        return false;
    }

}