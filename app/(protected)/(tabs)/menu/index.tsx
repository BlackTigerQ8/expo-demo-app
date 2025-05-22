import { getAllFood } from "@/api/calls";
import ProductCard from "@/app/components/ProductCard";
import { Meal } from "@/app/types/foodTypes";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";

const MenuScreen = () => {
  const [foodMenu, setFoodMenu] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchFoodMenu = async () => {
      const response = await getAllFood();
      setFoodMenu(response);
    };
    fetchFoodMenu();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Menu</Text>
      <FlatList
        data={foodMenu}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <ProductCard
            id={item.idMeal}
            name={item.strMeal}
            price={item.price || 0}
            imageUrl={item.strMealThumb}
            description={item.strInstructions?.slice(0, 100) + "..."}
            onPress={() => {
              console.log("Meal pressed:", item.strMeal);
            }}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <FAB
        icon="food-fork-drink"
        style={styles.fab}
        onPress={() => router.push("/menu/Create")}
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    position: "relative",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    padding: 20,
    paddingBottom: 10,
  },
  listContainer: {
    padding: 10,
    paddingBottom: 80, // Add padding at bottom to prevent FAB from covering content
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 16,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 16,
    bottom: 16,
    zIndex: 1,
  },
});
