import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  onPress?: () => void;
};

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  description,
  onPress,
}: ProductCardProps) {
  return (
    <Link href={`/menu/${id}`} asChild>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff8800",
  },
});
