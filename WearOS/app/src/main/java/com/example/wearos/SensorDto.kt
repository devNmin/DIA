package com.example.wearos

import com.google.gson.annotations.SerializedName

data class SensorDto(
//    @SerializedName("userSteps")
    val userSteps:Float? = null,
    val userAverageHeartRate:Float?=null
)