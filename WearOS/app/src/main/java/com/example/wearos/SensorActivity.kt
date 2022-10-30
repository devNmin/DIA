package com.example.wearos

import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.example.myapplication.R

class SensorActivity : AppCompatActivity() ,SensorEventListener{
    //Sensor and SensorManager
    var mHeartRateSensor: Sensor? = null
    var mSensorManager: SensorManager? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sensor)

        mSensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
        mHeartRateSensor = mSensorManager!!.getDefaultSensor(Sensor.TYPE_HEART_RATE);

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
        }
    }

    override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
//        return
    }
}