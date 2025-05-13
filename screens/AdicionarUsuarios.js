import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  getFirestore,
  doc,
  setDoc,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
// // import s3 from '../../awsConfig';
// import aws from 'aws-sdk';

const S3_BUCKET = 'bucket-storage-senai-30';


// Função que registra o usuário
const registerUser = async (email, password, nome, imageUri) => {
  const auth = getAuth(getApp());
  const firestore = getFirestore(getApp());

  try {
    // Criação de usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Upload da imagem para o S3
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const filePath = `perfil_imagem/${user.uid}/${filename}`;

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const uploadParams = {
      Bucket: S3_BUCKET,
      Key: filePath,
      Body: blob,
      ContentType: 'image/jpeg',
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    const photoURL = uploadResult.Location;

    // Salvar dados do usuário no Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      email: email,
      nome: nome,
      photoURL: photoURL,
    });

    console.log('Usuário registrado e imagem salva no S3');
    return user;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    Alert.alert('Erro', 'Não foi possível registrar o usuário.');
  }
};

const Cadastro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (email && password && nome && imageUri) {
      await registerUser(email, password, nome, imageUri);
      alert('Sucesso', 'Usuário registrado com sucesso!');
    } else {
      alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      <Pressable onPress={pickImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Selecionar Foto</Text>
        )}
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.botao} onPress={handleRegister}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 120,
    color: '#777',
    fontSize: 16,
  },
});

export default Cadastro;