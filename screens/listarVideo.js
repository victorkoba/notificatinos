import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import s3 from '../awsConfig';

const bucketName = 'bucket-storage-senai-30';

export default function ListarVideosPorCategoria({ navigation }) {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Buscar categorias (pastas)
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await s3
        .listObjectsV2({
          Bucket: bucketName,
          Prefix: 'videos/',
          Delimiter: '/',
        })
        .promise();

      const folders = response.CommonPrefixes.map((prefix) => {
        const folderPath = prefix.Prefix;
        return folderPath.replace('videos/', '').replace('/', '');
      });

      setCategories(folders);
      if (folders.length > 0) {
        setCategory(folders[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias: ', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Buscar vídeos de uma categoria
  const fetchVideos = async () => {
    if (!category) return;

    setLoading(true);
    const prefix = `videos/${category}/`;

    try {
      const response = await s3
        .listObjectsV2({
          Bucket: bucketName,
          Prefix: prefix,
        })
        .promise();

      const videoFiles = response.Contents?.filter(
        (file) => file.Size > 0 && !file.Key.endsWith('/')
      );

      const videoUrls =
        videoFiles?.map((file) => ({
          key: file.Key,
          name: file.Key.split('/').pop(),
          url: `https://${bucketName}.s3.amazonaws.com/${encodeURI(file.Key)}`,
        })) || [];

      setVideos(videoUrls);
    } catch (error) {
      console.error('Erro ao carregar vídeos: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category) {
      fetchVideos();
    }
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma categoria:</Text>

      {loadingCategories ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          style={styles.picker}
        >
          {categories.map((cat) => (
            <Picker.Item label={cat} value={cat} key={cat} />
          ))}
        </Picker>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <ScrollView style={styles.scroll}>
          {videos.map((video) => (
            <View key={video.key} style={styles.videoContainer}>
              <Text style={styles.videoTitle}>{video.name}</Text>
              <Video
                source={{ uri: video.url }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay={false}
                useNativeControls
                style={styles.video}
              />
            </View>
          ))}
        </ScrollView>
      )}

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  picker: {
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
  },
  videoContainer: {
    marginBottom: 24,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
