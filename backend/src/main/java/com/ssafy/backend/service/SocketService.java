package com.ssafy.backend.service;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SocketService {

    private final SimpMessageSendingOperations messagingTemplate;

    public void serverToClientMessage(String userEmail, JSONObject obj) {
        System.out.println("serverToClientMessage");
        messagingTemplate.convertAndSend("/sub/" + userEmail, obj);
    }
}
