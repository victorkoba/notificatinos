import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import s3 from '../../awsConfig';

const BUCKET_NAME = "bucket-storage-senai-30";
const FOLDER = "imagens/";

export default function ListarImagens({ navigation }) {
  const [imagens, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImagens = async () => {
      try {
        const response = await s3
          .listObjectsV2({ Bucket: BUCKET_NAME, Prefix: FOLDER })
          .promise();

        const imageFiles = response.Contents.filter((file) =>
          file.Key.match(/\.(jpg|jpeg|png)$/i)
        );

        const imageURLs = imageFiles.map((file) => ({
          name: file.Key.split("/").pop(),
          url: `https://${BUCKET_NAME}.s3.amazonaws.com/${file.Key}`,
        }));

        setImages(imageURLs);
      } catch (error) {
        console.error("Erro ao listar imagens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagens();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Imagens Salvas no S3</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : imagens.length === 0 ? (
        <Text style={styles.info}>Nenhuma imagem encontrada.</Text>
      ) : (
        imagens.map((img, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: img.url }} style={styles.image} />
            <Text style={styles.nome}>{img.name}</Text>
          </View>
        ))
      )}

      <Pressable style={styles.botao} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#777',
    marginVertical: 20,
  },
  card: {
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    padding: 10,
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: {
    fontSize: 14,
    color: '#555',
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
