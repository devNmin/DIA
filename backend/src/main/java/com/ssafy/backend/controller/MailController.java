package com.ssafy.backend.controller;

import com.ssafy.backend.dto.MailDto;
import com.ssafy.backend.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class MailController {

    @Autowired
    private MailService mailService;

    @PostMapping("/mailsend")
    public ResponseEntity<?> signup(
            @Valid @RequestBody MailDto mailDto
    ) throws Exception {
        String code = mailService.sendSimpleMessage(mailDto.getEmail());
        System.out.println("인증코드 : " + code);
        return ResponseEntity.ok(code);
    }
}
