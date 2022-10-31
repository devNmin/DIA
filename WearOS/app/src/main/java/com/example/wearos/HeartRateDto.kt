package com.example.wearos

data class HeartRateDto(
//    @SerializedName("userId")
    val userId: Int?,

//    @SerializedName("userName")
    val userName:String?,

//    @SerializedName("userEmail")
    val userEmail: String?,

//    @SerializedName("heartRate")
    val userHeartRate: Float?
)