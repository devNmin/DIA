package com.example.wearos

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.inputmethod.EditorInfo
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.R
import com.example.myapplication.databinding.ActivityMainBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
//        setContentView(R.layout.activity_main)

        val editText = findViewById<EditText>(R.id.user_code)
        val check_btn = findViewById<Button>(R.id.check_btn)
        var intentCheck = false;
        val intent = Intent(this,StartActivity::class.java);

        editText.setOnEditorActionListener{textView,action,event->
            var handled = true
            if(action == EditorInfo.IME_ACTION_DONE){
                userCheck(editText,intent)
                handled = false
                intentCheck = true;
            }
            handled
        }

        check_btn.setOnClickListener(){
            userCheck(editText,intent)
            intentCheck = true;
        }



    }

    fun userCheck(editText:EditText, intent: Intent){
        val user_code =editText.text.toString()
        if(user_code == "1"){
            Toast.makeText(this,"hello",Toast.LENGTH_SHORT).show()
        }

        val retrofit = Retrofit.Builder().baseUrl("https://k7b307.p.ssafy.io/api/v1/")
            .addConverterFactory(GsonConverterFactory.create()).build();

        val service = retrofit.create(APIS::class.java);


        service.checkCode(user_code)?.enqueue(object : Callback<User>{
            override fun onResponse(call:Call<User>,response: Response<User>){
                if(response.isSuccessful){
                    var result: User? = response.body()
                    Log.d("Check","응답 성공: "+ result?.toString());

                    intent.putExtra("userEmail",result?.userEmail);
                    intent.putExtra("userName",result?.userName);
                    intent.putExtra("userCode",user_code);
                    startActivity(intent);
                }else{
                    Log.d("Check", "존재하지 않는 사용자: ")
                }
            }


            override fun onFailure(call: Call<User>, t: Throwable) {
                // 통신 실패 (인터넷 끊킴, 예외 발생 등 시스템적인 이유)
                Log.d("Check", "onFailure 에러: " + t.message.toString());
            }
        })
    }
}