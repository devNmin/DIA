package com.example.wearos

import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import com.example.myapplication.R
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class SensorActivity : AppCompatActivity() ,SensorEventListener{
    //Sensor and SensorManager
    var mHeartRateSensor: Sensor? = null
    var mSensorManager: SensorManager? = null

    var retrofit:Retrofit? = null
    var service:APIS? = null

    var userEmail:String?=null
    var userName:String?=null
    var userCode:Int?=null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sensor)

        mSensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
        mHeartRateSensor = mSensorManager!!.getDefaultSensor(Sensor.TYPE_HEART_RATE);

        //retrofit 객체 생성
        retrofit = Retrofit.Builder().baseUrl("http://k7b307.p.ssafy.io/api/v1/")
            .addConverterFactory(GsonConverterFactory.create()).build();

        //직접적으로 요청보낼 service 객체 생성
        service = retrofit!!.create(APIS::class.java);

        //intent로 받아온 데이터
        userEmail = intent.getStringExtra("userEmail");
        userName = intent.getStringExtra("userName");
        userCode = intent.getStringExtra("userCode")?.toInt();

        val checkBtn = findViewById<Button>(R.id.check_btn); //측정시작 버튼
        val intent = Intent(this,StartActivity::class.java);
        checkBtn.setOnClickListener(){
            mSensorManager!!.unregisterListener(this);
            startActivity(intent);
        }


    }

    override fun onResume() {
        super.onResume()
        if (mSensorManager != null){
            mSensorManager!!.registerListener(this, mHeartRateSensor, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    override fun onSensorChanged(event : SensorEvent) {
        //Update your data.
        Log.d("Check Sensor","Result: "+event)
        if (event.sensor.getType() == Sensor.TYPE_HEART_RATE) {
            //heart rate = (int) event.values[0];
            Log.d("Heart Rate!!!!!","Result: "+event.values[0] + " event: "+event.values)
            val requestBody = HeartRateDto(
                userCode,
                userName,
                userEmail,
                event.values[0])
            service?.sendHeartRate(requestBody)?.enqueue(object : Callback<ResponseDto> {
                override fun onResponse(call: Call<ResponseDto>, response: Response<ResponseDto>) {
                    if(response.isSuccessful){
                        var result: ResponseDto? = response.body()
                        Log.d("Check","응답 성공: "+ result?.toString());

                    }else{
                        Log.d("Check", "존재하지 않는 사용자: ")
                    }
                }

                override fun onFailure(call: Call<ResponseDto>, t: Throwable) {
                    Log.d("Check", "onFailure 에러: " + t.message.toString());
                }
            })
        }
    }

    override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
//        return
    }
}