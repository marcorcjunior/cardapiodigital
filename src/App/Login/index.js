import React, { useState, useEffect } from "react";
import { logInWithReadPermissionsAsync } from "expo-facebook";
import {
  StyleSheet,
  Dimensions,
  Alert,
  ImageBackground,
  View,
  Image
} from "react-native";
import {
  withTheme,
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Divider
} from "react-native-paper";

import firebase from "firebase";

import Container from "../../componentes/Container";

import logo from "../../../images/logo-final.png";
import cadapiodigital from "../../../images/cadapiodigital.png";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import api from "../../utils/api";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
});

const Login = ({ theme }) => {
  return (
    <Container style={{ backgroundColor: theme.colors.background }}>
      <ImageBackground
        source={{
          uri:
            "https://www.collact.com.br/wp-content/uploads/2017/08/restaurante-decoracao.png"
        }}
        style={{
          flex: 1,
          alignContent: "center",
          alignItems: "center"
        }}
        resizeMode="cover"
        blurRadius={1}
      >
        <Container />
        <Card style={{ width: "45%", heigth: "45%" }}>
          <Card.Content>
            <View style={{ alignContent: "center", alignItems: "center" }}>
              <Image
                source={logo}
                style={{
                  height: 128,
                  width: 128,
                  marginBottom: 16
                }}
              />
              <Title>Seja bem vindo</Title>
              <Paragraph>Escolha como deseja logar!</Paragraph>

              <View style={{ marginTop: 16, marginBottom: 16 }} />

              <Button
                mode="outlined"
                icon="star"
                onPress={async () => {
                  const parameters = {
                    permissions: ["public_profile", "email"]
                  };
                  logInWithReadPermissionsAsync("1229372737223999", parameters)
                    .then(({ type, token }) => {
                      if (type === "success") {
                        const url = `https://graph.facebook.com/me?fields=name,email&access_token=${token}`;
                        axios.get(url).then(({ data: { id, name, email } }) => {
                          console.warn(id, name, email);
                          api.getUsuario("szOwMCFF163FAfE5pTAu");
                        });
                      } else {
                        alert("Facebook Login cancelado.");
                      }
                    })
                    .catch(({ message }) => {
                      alert(`Facebook Login Error: ${message}`);
                    });
                }}
              >
                Fidelidade
              </Button>

              <View style={{ marginTop: 8 }} />
              <Paragraph>ou</Paragraph>
              <View style={{ marginBottom: 8 }} />

              <Button
                mode="outlined"
                icon="touch-app"
                onPress={() => {
                  api.getUsuario("szOwMCFF163FAfE5pTAu");
                }}
              >
                Convidado
              </Button>

              <Image
                resizeMode="contain"
                source={cadapiodigital}
                style={{
                  height: 128,
                  width: 192,
                  marginTop: 16
                }}
              />
            </View>
          </Card.Content>
        </Card>
        <Container />
      </ImageBackground>
    </Container>
  );
};

export default withTheme(Login);
