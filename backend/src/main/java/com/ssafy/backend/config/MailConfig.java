package com.ssafy.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {
    // env 파일에 저장된 값 사용
    @Value("${mail.host}")
    private String mailHost;
    @Value("${mail.username}")
    private String mailUsername;
    @Value("${mail.userpassword}")
    private String mailUserpassword;
    @Value("${mail.port}")
    private int mailPort;

    @Bean
    public JavaMailSender javaMailService(){
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        javaMailSender.setHost(mailHost);
        javaMailSender.setUsername(mailUsername);
        javaMailSender.setPassword(mailUserpassword);
        javaMailSender.setPort(mailPort);

        javaMailSender.setJavaMailProperties(getMailProperties());

        return javaMailSender;
    }

    private Properties getMailProperties(){
        Properties properties = new Properties();

        properties.setProperty("mail.transport.protocol", "smtp"); // 프로토콜 설정
        properties.setProperty("mail.smtp.starttls.enable", "true"); // smtp strattles 사용
        properties.setProperty("mail.debug", "true"); // 디버그 사용
        properties.setProperty("mail.smtp.auth", "true"); // smtp 인증
        properties.setProperty("mail.smtp.ssl.enable","true"); // ssl 사용
        properties.setProperty("mail.smtp.ssl.trust", mailHost); // ssl 인증 서버는 smtp.naver.com

        return properties;
    }
}
