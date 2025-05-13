// Victor Luiz Koba Batista
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground
} from 'react-native';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig';

const RealizarLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const tentarLogin = () => {
        // Verificação simples de e-mail
        if (!email.includes('@')) {
            alert('Você não inseriu um e-mail válido!');
            return;
        }

        // Login fictício (hardcoded)
        const senhaUsuario = 'senha123';
        const emailCorreto = 'email@email.com';

        if (email === emailCorreto && password === senhaUsuario) {
            alert('Login realizado com sucesso!');
            navigation.navigate('Inicio');
        } else {
            alert('Email ou senha incorretos');
        }
    };

    // // Login com Firebase (descomente se for usar)
    // const tentarLogin = () => {
    //     const auth = getAuth(app);
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then(() => {
    //             navigation.navigate('PaginaPrincipal');
    //         })
    //         .catch((error) => {
    //             console.error('Falha no login:', error);
    //             alert('Email ou senha incorretos');
    //         });
    // };

    return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#aaa"
                />

                <TouchableOpacity style={styles.button} onPress={tentarLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
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
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000",
    },
    input: {
        width: "90%",
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#000",
        backgroundColor: "rgba(9, 9, 19, 0.2)",
        color: "#000",
    },
    button: {
        backgroundColor: "#00a3ff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        width: "90%",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default RealizarLogin;