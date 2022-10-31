package com.example.wearos

import android.Manifest
import android.content.Intent
import android.content.SharedPreferences
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.R



class StartActivity : AppCompatActivity() {
    //사용자 정보 저장
    private var prefs: SharedPreferences?=null

    var userEmail:String?=null
    var userName:String?=null
    var userCode:Int?=null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_start);


        //저장된 정보 가져오는 객체
        prefs = this.getSharedPreferences("user_prefs",0)
        //저장된 정보 불러오기
        prefs!!.getString("user_email","")
        userEmail = prefs!!.getString("user_email","");
        userName = prefs!!.getString("user_name","");
        userCode = prefs!!.getString("user_code","")?.toInt();

        Toast.makeText(this,userEmail + " , "+userName + " , "+userCode,Toast.LENGTH_SHORT).show()

        val checkBtn = findViewById<Button>(R.id.check_btn); //측정시작 버튼

        if (checkSelfPermission(Manifest.permission.BODY_SENSORS) != PackageManager.PERMISSION_GRANTED) {
            val heartCheck: Array<String> = arrayOf(Manifest.permission.BODY_SENSORS)
            requestPermissions(heartCheck, 1)
        }else {
            Log.d("Check", "ALREADY GRANTED");
        }

        //측정 화면으로 넘어가기 위한 intent
        val intent = Intent(this,SensorActivity::class.java);

        checkBtn.setOnClickListener(){
            startActivity(intent);
        }

        val mainBtn = findViewById<Button>(R.id.main_btn)
        val mainIntent = Intent(this,MainActivity::class.java)
        //메인 화면으로 돌아가서 다시 처음부터 세팅하게 함
        mainBtn.setOnClickListener(){
            //빈 값으로 다시 세팅하도록
            prefs!!.edit().putString("user_code","").apply()
            startActivity(mainIntent);
        }

    }

}
