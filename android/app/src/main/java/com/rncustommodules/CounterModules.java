package com.rncustommodules;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nonnull;

public class CounterModules extends ReactContextBaseJavaModule {
    private int count = 0;

    public CounterModules(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "Counter";
    }

    @ReactMethod
    public void increment() {
        count += 1;
        sendUpdateEvent();
    }

    @ReactMethod
    public void getCount(Promise promise) {
        promise.resolve(count);
    }

    @ReactMethod
    public void setCount(int newCount) {
        count = newCount;
        sendUpdateEvent();
    }

    private void sendUpdateEvent() {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onChange", count);
    }
}
