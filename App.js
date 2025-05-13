//Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PaginaPrincipal from "./screens/PaginaPrincipal";
import UploadImagem from "./screens/UploadImagem";
import UploadVideo from "./screens/UploadVideo";
import AdicionarJogador from "./screens/AdicionarJogador";
import ListarImagem from "./screens/listarImagen";
import ListarVideo from "./screens/listarVideo";

import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldSetBadge:false,
    shouldPlaySound: true,
  })
})

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PaginaPrincipal">
        <Stack.Screen
          name="PaginaPrincipal"
          component={PaginaPrincipal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadImagem"
          component={UploadImagem}
          options={{
            title: "Upload Imagens",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="UploadVideo"
          component={UploadVideo}
          options={{
            title: "Upload Vídeos",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="adicionarJogador"
          component={AdicionarJogador}
          options={{
            title: "Adicionar Jogador",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="listarVideo"
          component={ListarVideo}
          options={{
            title: "Listar Vídeos",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="listarImagem"
          component={ListarImagem}
          options={{
            title: "Listar Imagens",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;