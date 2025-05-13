import React, { useDebugValue, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";
import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as Notifications from "expo-notifications";

const AdicionarUsuario = ({ navigation }) => {
  const img =
    "https://img.freepik.com/vetores-gratis/vetor-azul-escuro-do-fundo-da-historia-do-facebook-de-memphis_53876-162121.jpg?t=st=1743519404~exp=1743523004~hmac=0956c84fe373416ac4719a6be4a53a27d5f2f68a70c952c7f34477f065057055&w=740";

  const [nome, setNome] = useState("");
  const [altura, setAltura] = useState("");
  const [camisa, setCamisa] = useState("");
  const [nascimento, setNascimento] = useState("");

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(
          (notification) => {
            console.log("Notification received: ", notification);
          }
        );
        return () => subscription.remove();  
      }, []);
 
      const requestLocalNotificationPermission = async () => {
        const {status} = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permissão de notificação", "Permissão não concedida.");
          return false;
        }
 
        return true;
     
      };

  const addJogador = async () => {
    if (!nome || !altura || !camisa || !nascimento) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const jogadoresCollection = collection(db, "real-madrid");

      const [day, month, year] = nascimento.split("/");
      const nascimentoDate = new Date(`${year}-${month}-${day}`);
      const nascimentoTimestamp = Timestamp.fromDate(nascimentoDate);

      await addDoc(jogadoresCollection, {
        nome,
        altura: parseFloat(altura),
        camisa: parseInt(camisa),
        nascimento: nascimentoTimestamp,
      });

    const permission = await requestLocalNotificationPermission();

    if (permission) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Novo Jogador Adicionado",
          body: `O jogador ${nome} foi adicionado com sucesso!`,
        },
        trigger: null,
      });
    }

      alert("Sucesso", "Jogador adicionado com sucesso!");
      navigation.navigate("ListarJogadores");
    } catch (error) {
      console.error("Erro ao adicionar jogador: ", error);
      alert("Erro", "Ocorreu um erro ao adicionar o jogador.");
    }
  };

  return (
    <ImageBackground source={{ uri: img }} style={styles.background}>
      <Text style={styles.titulo}>Adicionar Jogador</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (ex: 1.80)"
        value={altura}
        onChangeText={setAltura}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Número da camisa"
        value={camisa}
        onChangeText={setCamisa}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nascimento (dd/mm/aaaa)"
        value={nascimento}
        onChangeText={setNascimento}
      />

      <Pressable style={styles.botao} onPress={addJogador}>
        <Text style={styles.botaoTexto}>Salvar Jogador</Text>
      </Pressable>

      <Pressable style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTextoVoltar}>Voltar</Text>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  botao: {
    backgroundColor: "#0C242E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  voltar: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  botaoTextoVoltar: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default AdicionarUsuario;