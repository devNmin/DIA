package com.ssafy.backend.controller;

import com.ssafy.backend.dto.HeartDto;
import com.ssafy.backend.dto.ResponseDto;
import com.ssafy.backend.dto.SensorDto;
import com.ssafy.backend.util.SocketMessageUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    private final SimpMessagingTemplate messagingTemplate;

    public HealthController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/heart/rate")
    public ResponseEntity<?> UserHeartRate(
            @RequestBody HeartDto heartDto
            ){
        System.out.println(heartDto.getUserEmail());

        SocketMessageUtil messageUtil = new SocketMessageUtil(messagingTemplate);
        messageUtil.heartBeatMessage(heartDto);

        return ResponseEntity.ok(new ResponseDto(200,"전송 완료"));
    }

    @PostMapping("/sensor")
    public ResponseEntity<?> UserSensorData(
            @RequestBody SensorDto sensorDto
    ){
        System.out.println("userSensorData: "+sensorDto.getUserSteps());
        System.out.println("userSensorData: "+sensorDto.getUserAverageHeartRate());
        return ResponseEntity.ok(new ResponseDto(200,"전송 완료"));
    }
}
