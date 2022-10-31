package com.example.wearos

import com.google.gson.annotations.SerializedName

data class ResponseDto(
    @SerializedName("statusCode")
    val statusCode: Int,

    @SerializedName("message")
    val message : String
)