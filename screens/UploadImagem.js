import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Pressable,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import s3 from "../awsConfig";

const S3_BUCKET = "bucket-storage-senai-30";

export default function UploadVideo({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  // Solicitar permissão para notificações
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão necessária", "As notificações não foram permitidas.");
      }
    };
    requestNotificationPermission();
  }, []);

  // Escolher imagem da galeria
  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Acesso às fotos não permitido.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  // Enviar notificação após upload
  const enviarNotificacao = async (mensagem) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upload Concluído!",
        body: mensagem,
      },
      trigger: null,
    });
  };

  // Fazer o upload da imagem
  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Erro", "Nenhuma imagem selecionada.");
      return;
    }

    if (!category.trim()) {
      Alert.alert("Erro", "Por favor, preencha a categoria.");
      return;
    }

    try {
      setUploading(true);
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = `imagens/${category.trim()}/${Date.now()}.jpg`;

      const params = {
        Bucket: S3_BUCKET,
        Key: filename,
        Body: blob,
        ContentType: "image/jpeg",
      };

      s3.upload(params, async (err, data) => {
        setUploading(false);
        if (err) {
          console.error("Erro no upload:", err);
          Alert.alert("Erro", "Falha no envio da imagem.");
        } else {
          console.log("Imagem disponível em:", data.Location);
          Alert.alert("Sucesso", "Imagem salva com sucesso!");

          // Enviar notificação
          await enviarNotificacao("Imagem adicionada com sucesso!");

          // Limpar campos e fechar modal
          setImageUri(null);
          setCategory("");
          setModalVisible(false);
        }
      });
    } catch (error) {
      setUploading(false);
      console.error("Erro no upload:", error);
      Alert.alert("Erro", "Falha no envio da imagem.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Selecionar imagem" onPress={escolherImagem} />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite a categoria:</Text>
            <TextInput
              style={styles.input}
              placeholder="Categoria"
              value={category}
              onChangeText={setCategory}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={uploadImage}>
                <Text style={styles.buttonText}>
                  {uploading ? "Enviando..." : "Enviar imagem"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
