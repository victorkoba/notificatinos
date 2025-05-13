import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PaginaPrincipal from "./screens/PaginaPrincipal";
import AdicionarUsuario from "./screens/AdicionarUsuarios";
import UploadImagem from "./screens/UploadImagem";
import UploadVideo from "./screens/UploadVideo";
import AdicionarJogador from "./screens/AdicionarJogador";

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
          name="AdicionarUsuario"
          component={AdicionarUsuario}
          options={{
            title: "Adicionar Usuário",
            headerShown: true,
          }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;