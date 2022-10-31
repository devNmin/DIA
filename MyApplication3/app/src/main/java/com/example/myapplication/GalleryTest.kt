package com.example.myapplication

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_gallery_test.*

class GalleryTest : AppCompatActivity() {
    private var GALLERY = 1
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_gallery_test)

        iv.setOnClickListener{
            val intent: Intent = Intent(Intent.ACTION_GET_CONTENT)
            intent.setType("image/*")
            startActivityForResult(intent,GALLERY)
        }
    }

    @Override
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if( resultCode == Activity.RESULT_OK){
            if( requestCode ==  GALLERY)
            {
                var ImnageData: Uri? = data?.data
                Toast.makeText(this,ImnageData.toString(), Toast.LENGTH_SHORT ).show()
                try {
                    val bitmap = MediaStore.Images.Media.getBitmap(contentResolver, ImnageData)
                    iv.setImageBitmap(bitmap)
                }
                catch (e:Exception)
                {
                    e.printStackTrace()
                }
            }
        }
    }

}