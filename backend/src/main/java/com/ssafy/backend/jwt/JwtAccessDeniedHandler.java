package com.ssafy.backend.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.dto.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Component
@Slf4j
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    // 권한이 존재 하지 않는 경우 403 err 리턴
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
//        request.setAttribute("403","권한이 없습니다");
//        response.sendError(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.FORBIDDEN.value());
        try (OutputStream os = response.getOutputStream()) {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(os, new ResponseEntity<ResponseDto>(new ResponseDto(403,"권한이 없습니다"),HttpStatus.UNAUTHORIZED));
            os.flush();
        }
    }

}