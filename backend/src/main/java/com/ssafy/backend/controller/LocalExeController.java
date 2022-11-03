package com.ssafy.backend.controller;

import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/v1/dia")
public class LocalExeController {

    @GetMapping("/exe")
    public ResponseEntity<?> getLocalExeFile() throws MalformedURLException {
        String contentDisposition = "attachment; filename=\""+"localExe/DIA.exe"+"\"";
        UrlResource resource = new UrlResource("file:"+"localExe/DIA.exe");


        // 파일 다운로드 형식
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,contentDisposition)
                .body(resource);
    }
}
