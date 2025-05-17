import { getFoodById } from "@/api/calls";
import { Meal } from "@/app/types/foodTypes";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const FoodDetails = () => {
  const { FoodId } = useLocalSearchParams();
  const [selectedFood, setSelectedFood] = useState<Meal | null>(null);

  useEffect(() => {
    getFoodById(String(FoodId)).then(setSelectedFood);
  }, [FoodId]);

  if (!selectedFood) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: selectedFood.strMealThumb }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{selectedFood.strMeal}</Text>
        <Text style={styles.category}>{selectedFood.strCategory}</Text>
        <Text style={styles.instructions}>{selectedFood.strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});

export default FoodDetails;
