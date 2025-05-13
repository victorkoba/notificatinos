//Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";


const HomeBot = ({ navigation }) => {
  const sair = () => {
    alert('Você está saindo da conta');
    navigation.navigate("RealizarLogin")
  };
  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.box}>

          <Text style={styles.titulo}>Navegações</Text>

          <View style={styles.cartao}>
            <Pressable 
            style={styles.botaoPress}
            onPress={() => navigation.navigate("AdicionarUsuario")}
            >
              <Text style={styles.botao}> Adicionar Usuário </Text>
            </Pressable>

            <Pressable 
            style={styles.botaoPress}
            onPress={() => navigation.navigate("UploadImagem")}
            >
              <Text style={styles.botao}> Upload Imagens </Text>
            </Pressable>
            <Pressable 
            style={styles.botaoPress}
            onPress={() => navigation.navigate("UploadVideo")}
            >
              <Text style={styles.botao}> Upload Vídeos </Text>
            </Pressable>
            <Pressable 
            style={styles.botaoPress}
            onPress={() => navigation.navigate("adicionarJogador")}
            >
              <Text style={styles.botao}> Adicionar Jogador </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  box: {
    width: "100%",
    backgroundColor: "#fff", 
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  cartao: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  botaoPress: {
    width: "100%",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  botao: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeBot;
