package com.example.myapplication

import android.os.Build
import android.os.Bundle
import android.webkit.*
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity(){


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        //플로팅 버튼
//        fab.setOnClickListener{
//            val intent= Intent( this, CamActivity::class.java)
//            startActivity(intent)
//        }

        webview.settings.apply {
            this.setSupportMultipleWindows(false) // 새창 띄우기 허용
            this.setSupportZoom(false) // 화면 확대 허용
            this.javaScriptEnabled = true // 자바스크립트 허용
            this.javaScriptCanOpenWindowsAutomatically = false // 자바스크립트 새창 띄우기 허용
            this.loadWithOverviewMode = true // html의 컨텐츠가 웹뷰보다 클 경우 스크린 크기에 맞게 조정
            this.useWideViewPort = true // html의 viewport 메타 태그 지원
            this.builtInZoomControls = true // 화면 확대/축소 허용
            this.displayZoomControls = true
            this.layoutAlgorithm = WebSettings.LayoutAlgorithm.SINGLE_COLUMN // 컨텐츠 사이즈 맞추기
            this.cacheMode = WebSettings.LOAD_NO_CACHE // 브라우저 캐쉬 허용
            this.domStorageEnabled = true // 로컬 저장 허용
            this.databaseEnabled = true
            this.lightTouchEnabled = true
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            }
        }

        webview.webViewClient = WebViewClient()
        webview.addJavascriptInterface(WebAppInterface(this), "ReactAlert")

        webview.loadUrl("https://k7b307.p.ssafy.io/")
    }

    override fun onBackPressed() {
        if (webview.canGoBack())
        {
            webview.goBack()
        }
        else
        {
            finish()
        }
    }
}