import { instance } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface NewMealForm {
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  price: string;
}

const initialFormState: NewMealForm = {
  strMeal: "",
  strCategory: "",
  strInstructions: "",
  strMealThumb: "",
  price: "",
};

const CreateMeal = () => {
  const [form, setForm] = React.useState<NewMealForm>(initialFormState);
  const queryClient = useQueryClient();

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setForm({ ...form, strMealThumb: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const addMealMutation = useMutation({
    mutationFn: async (newMeal: NewMealForm & { price: number }) => {
      const formData = new FormData();

      // Add image file if it's a local URI
      if (form.strMealThumb.startsWith("file://")) {
        const filename = form.strMealThumb.split("/").pop() || "photo.jpg";
        formData.append("image", {
          uri: form.strMealThumb,
          name: filename,
          type: "image/jpeg",
        } as any);
      }

      // Add other form data
      Object.keys(newMeal).forEach((key) => {
        if (key !== "strMealThumb") {
          formData.append(key, newMeal[key as keyof typeof newMeal]);
        }
      });

      const response = await instance.post("/meals", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      Alert.alert("Success", "Meal added successfully!");
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to add meal. Please try again.");
      console.error("Error adding meal:", error);
    },
  });

  const handleSubmit = () => {
    if (!form.strMeal || !form.price || !form.strInstructions) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const price = parseFloat(form.price);
    if (isNaN(price)) {
      Alert.alert("Error", "Please enter a valid price");
      return;
    }

    addMealMutation.mutate({
      ...form,
      price: price,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          label="Meal Name"
          value={form.strMeal}
          onChangeText={(text) => setForm({ ...form, strMeal: text })}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Category"
          value={form.strCategory}
          onChangeText={(text) => setForm({ ...form, strCategory: text })}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Instructions"
          value={form.strInstructions}
          onChangeText={(text) => setForm({ ...form, strInstructions: text })}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={4}
        />

        <Button mode="outlined" onPress={pickImage} style={styles.imageButton}>
          Pick an image
        </Button>

        {form.strMealThumb ? (
          <Image
            source={{ uri: form.strMealThumb }}
            style={styles.imagePreview}
          />
        ) : null}

        <TextInput
          label="Price"
          value={form.price}
          onChangeText={(text) => {
            // Only allow numbers and decimal point
            const sanitizedText = text.replace(/[^0-9.]/g, "");
            // Prevent multiple decimal points
            if (sanitizedText.split(".").length > 2) return;
            setForm({ ...form, price: sanitizedText });
          }}
          style={styles.input}
          mode="outlined"
          keyboardType="decimal-pad"
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={addMealMutation.isPending}
          style={styles.button}
        >
          Add Meal
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    padding: 20,
    paddingTop: 40,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  imageButton: {
    marginBottom: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default CreateMeal;
