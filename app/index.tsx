import { ResizeMode, Video } from "expo-av";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isReady) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/images/animated_logo.mp4")}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isMuted
      />
      <Text style={styles.Title}>Demo App</Text>
      <Text style={styles.subtitle}>Welcome to the app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  video: {
    width: 300,
    height: 300,
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
    color: "#ff8800",
  },
  subtitle: {
    fontSize: 16,
    color: "#16ca67",
  },
});
