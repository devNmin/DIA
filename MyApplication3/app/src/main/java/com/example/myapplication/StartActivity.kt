package com.example.myapplication

import android.content.Intent
import android.content.pm.ActivityInfo
import android.content.res.Configuration
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import androidx.annotation.UiThread
import kotlinx.android.synthetic.main.activity_start.*

class StartActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {

        if(IsPhone()){ // phone 인 경우
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }else if(IsTablet()){ // table인 경우
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        }else{ // 알수 없는 경우
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        }

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_start)
        splashAnimation()

        // 일정 시간 지연 이후 실행하기 위한 코드
        Handler(Looper.getMainLooper()).postDelayed({

            // 일정 시간이 지나면 MainActivity로 이동
            val intent= Intent( this,MainActivity::class.java)
//            val intent= Intent( this,GalleryTest::class.java)
            startActivity(intent)

            // 이전 키를 눌렀을 때 스플래스 스크린 화면으로 이동을 방지하기 위해
            // 이동한 다음 사용안함으로 finish 처리
            finish()

        }, 3000)
    }

    @UiThread
    private fun splashAnimation(){
        val fade_out : Animation = AnimationUtils.loadAnimation(this, R.anim.fade_out)
        textView.startAnimation(fade_out)
        val fade_in2 : Animation = AnimationUtils.loadAnimation(this, R.anim.fade_in)
        imageView.startAnimation(fade_in2)
    }

    // 핸드폰인지 확인
    fun IsPhone(): Boolean {
        val screenSizeType =
            resources.configuration.screenLayout and Configuration.SCREENLAYOUT_SIZE_MASK
        return screenSizeType == Configuration.SCREENLAYOUT_SIZE_NORMAL || screenSizeType == Configuration.SCREENLAYOUT_SIZE_SMALL
    }

    // 태블릿인지 확인
    fun IsTablet(): Boolean {
        //화면 사이즈 종류 구하기
        val screenSizeType =
            resources.configuration.screenLayout and Configuration.SCREENLAYOUT_SIZE_MASK
        return screenSizeType == Configuration.SCREENLAYOUT_SIZE_XLARGE || screenSizeType == Configuration.SCREENLAYOUT_SIZE_LARGE
    }
}