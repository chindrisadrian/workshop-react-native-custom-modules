import React, { useState, useEffect } from "react";
import { StyleSheet, View, NativeModules, DeviceEventEmitter, NativeEventEmitter, Platform } from "react-native";

import Instructions from "./Instructions";
import Button from "./Button";

console.log(NativeModules);

const {Counter} = NativeModules;
const CounterEvents = new NativeEventEmitter(Counter);

export default function App() {
  const [count, setCount] = useState(0);
  const [nativeCount, setNativeCount] = useState(0);

  async function updateJavascriptCounter() {
    setCount(await Counter.getCount());
  }

  function UpdateNativeCounter() {
    Counter.setCount(count)
  }

  useEffect(() => {
    const emitter = Platform.OS === "ios" ? CounterEvents : DeviceEventEmitter;
    emitter.addListener("onChange", setNativeCount);
    return () => {
      emitter.removeListener("onChange", setNativeCount);
    }
  })

  return (
    <View style={styles.container}>
      <Button onPress={() => setCount(count + 1)} onLongPress={UpdateNativeCounter} value={count} color="dodgerblue">
        JavaScript counter
      </Button>

      <Instructions />

      <Button onPress={() => Counter.increment()} onLongPress={updateJavascriptCounter} value={nativeCount} color="orange">
        Native counter
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#ffffff"
  }
});
