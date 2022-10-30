package com.example.wearos

import com.google.gson.annotations.SerializedName

data class User (
    @SerializedName("userEmail")
    val userEmail: String,

    @SerializedName("userName")
    val userName: String
)