package com.ivanph.webintent;

import android.content.Intent;
import android.net.Uri;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;

/**
 * {@link NativeModule} that allows JS to open the default browser
    for an url.
 */
public class RNWebIntentModule extends ReactContextBaseJavaModule {

  ReactApplicationContext reactContext;

  public RNWebIntentModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "WebIntent";
  }

  @ReactMethod
  public void open(String url) {
    if (Uri.parse(url).getScheme() == null) {
      //if URL is missing scheme default to http
      Uri.Builder builder = new Uri.Builder();
      url = builder.scheme("http").authority(url).build().toString();
    }
    Intent intent = new Intent(Intent.ACTION_VIEW);
    intent.setData(Uri.parse(url));
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    //Check that an app exists to receive the intent
    if (intent.resolveActivity(this.reactContext.getPackageManager()) != null) {
      this.reactContext.startActivity(intent);
    }
  }
}
