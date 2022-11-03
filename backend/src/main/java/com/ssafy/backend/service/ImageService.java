package com.ssafy.backend.service;

import com.ssafy.backend.util.FileUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {
    private final FileUtil fileUtil;

    public ImageService(FileUtil fileUtil) {
        this.fileUtil = fileUtil;
    }

    public List<String> addProfile(String userEmail, List<MultipartFile> files,int flag) throws IOException {
        // parseFIleInfo로 파일을 저장
        List<String> list = fileUtil.parseFileInfo(userEmail,files,flag);

        if(list.isEmpty()){
            List<String> empty = new ArrayList<>();
            return empty;
        }else{
            //나중에 디비 관련된거 해줘야 함
            return list;
        }
    }
}
