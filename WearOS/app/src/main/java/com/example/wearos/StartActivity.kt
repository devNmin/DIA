package com.example.wearos

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.R

class StartActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_start);

        val userEmail = intent.getStringExtra("userEmail");
        val userName = intent.getStringExtra("userName");
        val userCode = intent.getStringExtra("userCode");

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

    }

}
