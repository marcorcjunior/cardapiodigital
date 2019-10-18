import React, { useState, useEffect } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Dimensions, View, Image, ScrollView } from 'react-native';
import {
    Avatar,
    Title,
    List,
    Divider,
    withTheme,
    Paragraph,
    Appbar,
} from 'react-native-paper';

import Layout from '../../componentes/Layout';
import Container from '../../componentes/Container';

import wallpaperUser from '../../../images/banner.png';
import { useTheme, useUser } from '../../../Provider';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    containerPerfil: {
        alignContent: 'center',
        alignItems: 'center',
    },
    avatarPerfil: {
        margin: 0,
    },
    avatarPerfilCamera: {
        position: 'absolute',
        top: 96,
        left: 96,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    wallpaperCamera: {
        position: 'absolute',
        top: 20,
        left: 20,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    containerAvatarPerfil: {
        position: 'absolute',
        top: 128,
        borderRadius: 128,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    backgroundPerfil: {
        width,
        height: 200,
        marginBottom: 8,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
});

const Perfil = ({ theme }) => {
    const [user, setUser] = useUser();
    const [ui, , changeTheme] = useTheme();
    const [nome, setNome] = useState('Convidado');
    const [email, setEmail] = useState('convidado@cardapiodigital.com.br');

    useEffect(() => {
        if (user) {
            setNome(user.login.nome);
            setEmail(user.login.email);
        }
    }, [user]);

    return (
        <Layout
            title="Perfil"
            subtitle=""
            actions={[
                <Appbar.Action
                    icon={
                        ui === 'light' ? 'invert-colors' : 'invert-colors-off'
                    }
                    onPress={changeTheme}
                />,
            ]}
        >
            <ScrollView>
                <Container style={{ backgroundColor: theme.colors.background }}>
                    <View style={styles.containerPerfil}>
                        <View style={styles.backgroundPerfil}>
                            <Image
                                source={{ uri: 'https://www.collact.com.br/wp-content/uploads/2017/08/restaurante-decoracao.png'}}
                                style={[
                                    styles.backgroundPerfil,
                                    { resizeMode: 'cover' },
                                ]}
                            />
                        </View>

                        <View
                            style={[
                                styles.containerAvatarPerfil,
                                { borderColor: theme.colors.background },
                            ]}
                        >
                            <View>
                                <Avatar.Icon
                                    size={128}
                                    icon="person"
                                    style={styles.avatarPerfil}
                                />
                            </View>
                        </View>

                        <Title style={{ marginTop: 56 }}>{nome}</Title>
                        <Paragraph>{email}</Paragraph>
                    </View>
                    <List.Section>
                        <List.Item
                            title="Termos de uso"
                            left={props => (
                                <List.Icon {...props} icon="gavel" />
                            )}
                            right={props => (
                                <List.Icon {...props} icon="chevron-right" />
                            )}
                            onPress={() => Actions.termosUso({})}
                        />
                        <Divider />
                        <List.Item
                            title="Sair"
                            left={props => (
                                <List.Icon {...props} icon="exit-to-app" />
                            )}
                            right={props => (
                                <List.Icon {...props} icon="chevron-right" />
                            )}
                            onPress={() => setUser(null)}
                        />
                    </List.Section>
                </Container>
            </ScrollView>
        </Layout>
    );
};

export default withTheme(Perfil);
