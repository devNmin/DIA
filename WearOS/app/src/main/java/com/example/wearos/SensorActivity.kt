package com.example.wearos

import android.content.Intent
import android.content.SharedPreferences
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.R
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.*

class SensorActivity : AppCompatActivity() ,SensorEventListener{
    //Sensor and SensorManager
    var mHeartRateSensor: Sensor? = null
    var mStepCountSensor:Sensor? = null
    var mSensorManager: SensorManager? = null

    var retrofit:Retrofit? = null
    var service:APIS? = null

    var userEmail:String?=null
    var userName:String?=null
    var userCode:Int?=null

    var userHeartRate:Float?=null

    private var prefs: SharedPreferences?=null

    var startStep:Float?=null // 시작 눌렀을 때 스텝 수
    var endStep:Float?=null //종료 눌렀을 때 스텝 수

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sensor)

        mSensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
        mHeartRateSensor = mSensorManager!!.getDefaultSensor(Sensor.TYPE_HEART_RATE);
        mStepCountSensor = mSensorManager!!.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
        startStep = -1.0f;
        endStep = 0.0f; //스텝 초기화
        userHeartRate = 0.0f //심박수 초기화
        var totalHeartRateCnt = 0; //전체 심박수 초기화
        var totalHeartRate = 0.0f; //전체 심박수의 합 초기화


        //retrofit 객체 생성
        //http://192.168.0.33:8081/api/v1/
        //https://k7b307.p.ssafy.io/api/v1/
        retrofit = Retrofit.Builder().baseUrl("https://k7b307.p.ssafy.io/api/v1/")
            .addConverterFactory(GsonConverterFactory.create()).build();

        //직접적으로 요청보낼 service 객체 생성
        service = retrofit!!.create(APIS::class.java);

        //저장된 정보 가져오는 객체
        prefs = this.getSharedPreferences("user_prefs",0)
        //저장된 정보 불러오기
        prefs!!.getString("user_email","")
        userEmail = prefs!!.getString("user_email","");
        userName = prefs!!.getString("user_name","");
        userCode = prefs!!.getString("user_code","")?.toInt();


        val timer = Timer()
        val timerTask: TimerTask = object : TimerTask() {
            override fun run() {
                //5초마다 심박수 전송
                if(userHeartRate!! > 0.0f){ //심박수가 측정이 된다면
                    totalHeartRateCnt++
                    totalHeartRate += userHeartRate!!
                    sendHeartRate(userHeartRate!!)
                }
            }
        }
        timer.schedule(timerTask, 0, 5000)

        val checkBtn = findViewById<Button>(R.id.check_btn); //측정시작 버튼
        val intent = Intent(this,StartActivity::class.java);
        checkBtn.setOnClickListener(){
            mSensorManager!!.unregisterListener(this); //센서 측정 종료
//            prefs!!.edit().putString("user_step",""+(endStep!!- startStep!!)).apply()
            sendData((endStep!! - startStep!!),(totalHeartRate/totalHeartRateCnt))
            if(timerTask != null){
                timerTask.cancel()
            }
            startActivity(intent);
        }

    }

    fun sendHeartRate(heartRate : Float){
        val requestBody = HeartRateDto(
            userCode,
            userName,
            userEmail,
            heartRate)
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

    //성공, 실패로 리턴하여 요청 성공한 경우만 intent작동하도록 함
    fun sendData(steps: Float, averageHeartRate: Float): Boolean {
        val requestBody = SensorDto(
            steps,
            averageHeartRate
        )
        var result = false;
        service?.sensorSend(requestBody)?.enqueue(object :Callback<ResponseDto>{
            override fun onResponse(call: Call<ResponseDto>, response: Response<ResponseDto>) {
                if(response.isSuccessful){
                    var result: ResponseDto? = response.body()
                    Log.d("Check","응답 성공: "+ result?.toString());

                }else{
                    Log.d("Check", "응답이 없음 ")
                }
                result = true
            }

            override fun onFailure(call: Call<ResponseDto>, t: Throwable) {
                Log.d("Check", "onFailure 에러: " + t.message.toString());
            }

        })
        return result
    }

    override fun onResume() {
        super.onResume()
        if (mSensorManager != null){
            mSensorManager!!.registerListener(this, mHeartRateSensor, SensorManager.SENSOR_DELAY_NORMAL);
            mSensorManager!!.registerListener(this,mStepCountSensor,SensorManager.SENSOR_DELAY_NORMAL)
        }
    }

    override fun onSensorChanged(event : SensorEvent) {
        //Update your data.
        if (event.sensor.type == Sensor.TYPE_HEART_RATE) {
            userHeartRate = event.values[0]
        }
//        if(event.sensor.type ==Sensor.TYPE_STEP_COUNTER){
//            if(startStep != -1.0f){ //처음 시작한 경우가 아닌 경우
//                endStep = event.values[0]
//                Log.d("second","STEPS: "+endStep)
//            }
//            else if(startStep == -1.0f){//처음 시작한 경우
//                startStep = event.values[0] //초기값 세팅
//                Log.d("First","STEPS: "+startStep)
//            }
//        }
    }

    override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
    }
}