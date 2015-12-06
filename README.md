# react-native-webintent

A React Native web intent for Android. Allows to open links in the default browser.

### Notice

As of [version 0.15](https://github.com/facebook/react-native/releases/tag/v0.15.0) react-native includes a `IntentAndroid` module that might suit yours needs better.

### Installation

```bash
npm install --save react-native-webintent
```

### Add it to your android project

* In `android/setting.gradle`

```gradle
...
include ':RNWebIntent', ':app'
project(':RNWebIntent').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-webintent')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':RNWebIntent')
}
```

* register module (in MainActivity.java)

```java
import com.ivanph.webintent.RNWebIntentPackage;;  // <--- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
  ......

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new RNWebIntentPackage())              // <------ add here
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

    setContentView(mReactRootView);
  }

  ......

}
```

## Example
```javascript
var WebIntent = require('react-native-webintent');

WebIntent.open('https://google.com');
```
## License

MIT
