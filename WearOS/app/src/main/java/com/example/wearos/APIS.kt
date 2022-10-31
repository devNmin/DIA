package com.example.wearos

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

interface APIS {

    @GET("check/code/{code}")
    @Headers("accept: application/json",
        "content-type: application/json"
    )
    fun checkCode(@Path("code") code: String):Call<User>

    @POST("health/heart/rate")
    @Headers("accept: application/json",
        "content-type: application/json"
    )
    fun sendHeartRate(@Body heartRateDto: HeartRateDto):Call<ResponseDto>

}