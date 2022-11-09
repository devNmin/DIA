package com.ssafy.backend.util;

import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class FileUtil {

    public List<String> parseFileInfo(
            String userEmail,
            List<MultipartFile> multipartFiles,
            int flag
    ) throws IOException {

        //파일 경로 저장 값
        List<String> fileList = new ArrayList<>();

        //파일이 없으면 빈 리스트 리턴
        if(multipartFiles.isEmpty()){
            return fileList;
        }

        // 파일 이름을 업로드 한 날짜로 바꾸어서 저장 -> 안겹치도록
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String current_date = simpleDateFormat.format(new Date());

        //프로젝트 폴더에 저장하기 위한 절대경로 설정
        String absolutePath = new File("").getAbsolutePath() +File.separator;

        //경로를 지정하고 해당 경로에 저장. 년월일별로 나누어서 저장
        String path = null;
        if(flag == 0) {//0인 경우 프로필 이미지로 저장
            path = "profile";
        }else if(flag == 1){//1인 경우 히트맵 이미지 경로로 저장
            path = "images/" + current_date;
        }
        File file = new File(absolutePath+path);



        //해당 디렉토리 없으면 생성해 줌
        if(!file.exists()){
//            file.mkdirs();
            System.out.println(absolutePath+path);
            System.out.println("파일 없음+++++++++++++++++++++++++++++++++++++++");
            Files.createDirectory(Paths.get(absolutePath+path));
        }else{
            System.out.println(absolutePath+path);
            System.out.println("파일 있음+++++++++++++++++++++++++++++++++++++++++++++");
        }


        //이미지 핸들링 시작
        for(MultipartFile multipartFile : multipartFiles){
            //파일이 있을때만 작업 실행
            if(!multipartFile.isEmpty()){
                // jpeg,png,gif 파일들만 처리
                String contentType = multipartFile.getContentType();
                String originalFileExtension;

                //확장자 명이 없으면 잘못된 이미지 파일
                if(ObjectUtils.isEmpty(contentType)){
                    break;
                }
                else{
                    if(contentType.contains("image/jpeg")||contentType.contains("image/jpg")){
                        originalFileExtension = ".jpg";
                    }else if(contentType.contains("image/png")){
                        originalFileExtension = ".png";
                    }else if(contentType.contains("image/gif")){
                        originalFileExtension = ".gif";
                    }else{ //다른 확장자는 받지 않음
                        break;
                    }
                }

                //나노초 + 사용자 ID + 확장자로 파일명 지정
                String new_file_name = null;

                if(flag == 0){
                    new_file_name = userEmail+originalFileExtension;
                }else if(flag == 1){
                    new_file_name= Long.toString(System.nanoTime()) + userEmail+originalFileExtension;
                }
                String totalPath = filePathBlackList(absolutePath+path+"/"+new_file_name);

                //로컬에 저장
                //db연결하면 db에 전체 경로를 저장해서 넘겨주면 됨
                file = new File(totalPath);
                if(file.exists()){ //이미 파일이 있다면 제거하고 다시 생성
                    file.delete();
                }

                InputStream inputStream = null;
                OutputStream fileOutputStream = null;
                try{
                    inputStream = multipartFile.getInputStream();
                    fileOutputStream = new FileOutputStream(totalPath);
                    int byteRead = 0;
                    byte[] buffer = new byte[2048];

                    while((byteRead = inputStream.read(buffer,0,2048)) != -1){
                        fileOutputStream.write(buffer,0,byteRead);
                    }
                }finally {
                    close(fileOutputStream,inputStream);
                }

                if((absolutePath+path).equals("//profile")){
                    totalPath = "https://k7b307.p.ssafy.io/profile/"+new_file_name;
                }
                fileList.add(totalPath);

//                multipartFile.transferTo(file);
            }
        }
        return fileList;
    }

    public static String filePathBlackList(String value) {
        String returnValue = value;
        if (returnValue == null || returnValue.trim().equals("")) {
            return "";
        }

        returnValue = returnValue.replaceAll("\\.\\.", "");

        return returnValue;
    }

    public static void close(Closeable... resources) {
        for (Closeable resource : resources) {
            if (resource != null) {
                try {
                    resource.close();
                } catch (IOException e) {
                    System.out.println(e);
                } catch (Exception e) {
                    System.out.println(e);
                }
            }
        }
    }
}
