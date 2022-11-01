package com.ssafy.backend.controller;

import com.ssafy.backend.dto.HeartDto;
import com.ssafy.backend.dto.ResponseDto;
import com.ssafy.backend.dto.SensorDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    @PostMapping("/heart/rate")
    public ResponseEntity<?> UserHeartRate(
            @RequestBody HeartDto heartDto
            ){
        System.out.println(heartDto.getUserEmail());
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
