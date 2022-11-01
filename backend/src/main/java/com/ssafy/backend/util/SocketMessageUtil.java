package com.ssafy.backend.util;

import com.ssafy.backend.dto.HeartDto;
import org.json.simple.JSONObject;
import org.springframework.messaging.simp.SimpMessagingTemplate;


public class SocketMessageUtil {
    private final SimpMessagingTemplate messagingTemplate;

    public SocketMessageUtil(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void heartBeatMessage(HeartDto heartDto){

        messagingTemplate.convertAndSend("/topic/api/" + heartDto.getUserEmail(), heartDto);
    }
}
