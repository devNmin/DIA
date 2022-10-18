package com.ssafy.backend.jwt;

import com.ssafy.backend.service.CustomUserDetailsService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    private TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;

    // 생성자
    public JwtFilter(TokenProvider tokenProvider, CustomUserDetailsService customUserDetailsService) {
        this.tokenProvider = tokenProvider;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String requestURI = httpServletRequest.getRequestURI();

        //local jwt 인증
//        System.out.println(" ------ local jwt start ------ ");
        String jwt = resolveToken(httpServletRequest);
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt) && tokenProvider.isNotLogin(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt); // 토큰의 인증 정보 가져오기
            SecurityContextHolder.getContext().setAuthentication(authentication); // 토큰 인증 정보를 security context에 저장
            System.out.println("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {} "+  authentication.getName() + requestURI);
        } else {
            logger.debug("유효한 JWT 토큰이 없습니다, uri: {} " + requestURI);
        }
        chain.doFilter(request, response);
    }

    // 토큰 정보를 가져오는 메소드
    private String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}