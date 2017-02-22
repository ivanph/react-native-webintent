package com.ivanph.webintent;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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


  @ReactMethod
  public void geo(String lat, String lng, String label, String zoom, String address) {

    String geo = "geo:" + lat + "," + lng + "?z=" + zoom;
    if (!lat.equals("0") && !lng.equals("0") && !label.equals("")) {
      geo += "&q=" + lat + "," + lng + "(" + label + ")";
    } else {
      geo += "&q=" + address;
    }

    Uri uri = Uri.parse( geo );
    Intent intent = new Intent(Intent.ACTION_VIEW, uri );
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    if (intent.resolveActivity(this.reactContext.getPackageManager()) != null) {
      this.reactContext.startActivity(intent);
    }
  }

  @ReactMethod
  public void dial(String url) {
    if (url.startsWith("tel")) {
        url = "tel:" + url;  
    }
    Intent intent = new Intent(Intent.ACTION_DIAL);
    intent.setData(Uri.parse(url));
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    if (intent.resolveActivity(this.reactContext.getPackageManager()) != null) {
      this.reactContext.startActivity(intent);
    }
  }
  
  @ReactMethod
  public void email(String mailto, String subject, String body, String intentTitle) {
    Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts("mailto",mailto, null));
    emailIntent.putExtra(Intent.EXTRA_SUBJECT, subject);
    emailIntent.putExtra(Intent.EXTRA_TEXT, body);

    Intent intent = Intent.createChooser(emailIntent, intentTitle);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

    if (intent.resolveActivity(this.reactContext.getPackageManager()) != null) {
      this.reactContext.startActivity(intent);
    }
  }
}
