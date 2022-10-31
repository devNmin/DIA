package com.example.myapplication

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.AsyncTask
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.webkit.*
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.app.ActivityCompat.startActivityForResult
import kotlinx.android.synthetic.main.activity_main.*
import java.io.File
import java.text.SimpleDateFormat
import java.util.*


class MainActivity : AppCompatActivity(){
    var cameraPath = ""
    var mWebViewImageUpload: ValueCallback<Array<Uri>>? = null
    var PERMISSIONS = arrayOf(
        Manifest.permission.READ_EXTERNAL_STORAGE,
        Manifest.permission.WRITE_EXTERNAL_STORAGE,
        Manifest.permission.CAMERA
    )
//    var urlPath = "https://k7b307.p.ssafy.io"
    var urlPath = "http://192.168.0.35:3000/mypage"
    private val REQUEST_CODE = 1112
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            val b: Boolean = checkPermission()
            if (b == false) {
                ActivityCompat.requestPermissions(this, PERMISSIONS, REQUEST_CODE)
            }
        }
        webviewSetting()

        webview.webChromeClient = object : WebChromeClient(){
            override fun onShowFileChooser(webView: WebView?, filePathCallback: ValueCallback<Array<Uri>>?, fileChooserParams: FileChooserParams?): Boolean {
                try{
                    mWebViewImageUpload = filePathCallback!!
                    var takePictureIntent : Intent?
                    takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                    if(takePictureIntent.resolveActivity(packageManager) != null){
                        var photoFile : File?

                        photoFile = createImageFile()
                        takePictureIntent.putExtra("PhotoPath",cameraPath)

                        if(photoFile != null){
                            cameraPath = "file:${photoFile.absolutePath}"
                            takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT,Uri.fromFile(photoFile))
                        }
                        else takePictureIntent = null
                    }
                    val contentSelectionIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
                    contentSelectionIntent.type = "image/*"

                    var intentArray: Array<Intent?>

                    if(takePictureIntent != null) intentArray = arrayOf(takePictureIntent)
                    else intentArray = takePictureIntent?.get(0)!!

                    val chooserIntent = Intent(Intent.ACTION_CHOOSER)
                    chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent)
                    chooserIntent.putExtra(Intent.EXTRA_TITLE,"사용할 앱을 선택해주세요.")
                    chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray)
                    launcher.launch(chooserIntent)
                }
                catch (e : Exception){ }
                return true
            }
        }

        webview.loadUrl(urlPath)
//        webview.loadUrl("http://192.168.31.85:3000 ")
        //플로팅 버튼
//        fab.setOnClickListener{
//            val intent= Intent( this, CamActivity::class.java)
//            startActivity(intent)
//        }
    }

    private fun checkPermission(): Boolean {
        for (i in PERMISSIONS.indices) {
            val result = ActivityCompat.checkSelfPermission(applicationContext, PERMISSIONS[i])
            if (result != PackageManager.PERMISSION_GRANTED) return false
        }
        return true
    }

    fun webviewSetting(){
        webview.settings.apply {
            this.setSupportMultipleWindows(false) // 새창 띄우기 허용
            this.setSupportZoom(false) // 화면 확대 허용
            this.javaScriptEnabled = true // 자바스크립트 허용
            this.javaScriptCanOpenWindowsAutomatically = false // 자바스크립트 새창 띄우기 허용
            this.loadWithOverviewMode = true // html의 컨텐츠가 웹뷰보다 클 경우 스크린 크기에 맞게 조정
            this.useWideViewPort = true // html의 viewport 메타 태그 지원
            this.builtInZoomControls = false // 화면 확대/축소 허용
            this.displayZoomControls = false
            this.layoutAlgorithm = WebSettings.LayoutAlgorithm.SINGLE_COLUMN // 컨텐츠 사이즈 맞추기
            this.cacheMode = WebSettings.LOAD_NO_CACHE // 브라우저 캐쉬 허용
            this.domStorageEnabled = true // 로컬 저장 허용
            this.databaseEnabled = true

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            }
        }

        webview.webViewClient = WebViewClient()
        webview.addJavascriptInterface(WebAppInterface(this), "ReactAlert")
    }

    fun createImageFile(): File? {
        @SuppressLint("SimpleDateFormat")
        val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss").format(Date())
        val imageFileName = "img_" + timeStamp + "_"
        val storageDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES)
        return File.createTempFile(imageFileName, ".jpg", storageDir)
    }

    val launcher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == RESULT_OK) {
            val intent = result.data

            if(intent == null){ //바로 사진을 찍어서 올리는 경우
                val results = arrayOf(Uri.parse(cameraPath))
                mWebViewImageUpload!!.onReceiveValue(results!!)
            }
            else{ //사진 앱을 통해 사진을 가져온 경우
                val results = intent!!.data!!
                mWebViewImageUpload!!.onReceiveValue(arrayOf(results!!))
            }
        }
        else{ //취소 한 경우 초기화
            mWebViewImageUpload!!.onReceiveValue(null)
            mWebViewImageUpload = null
        }
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