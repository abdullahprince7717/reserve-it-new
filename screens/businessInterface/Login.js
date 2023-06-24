import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase/FirebaseConfig.js'
import { MyStack } from '../../Navigation/AdminUIStack.js';
import AsyncStorage from '@react-native-async-storage/async-storage';




const SignIn = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [type,setType] = useState('Business');
    // const [IsSignedIn, setIsSignedIn] = useState(false);

    // useEffect(() => {

    //     const subscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.replace('Home')
    //             // navigation.navigate("AdminStack", { screen: 'Home' });

    //         }
    //     })
    //     return subscribe;

    // }, [])


    const saveData = async (uid) =>{

        try {
            await AsyncStorage.setItem('uid',uid);

            if(type == 'Business'){
                navigation.replace('Home')
            }else{
                navigation.replace('AdminHome')
            }

        } catch (error) {
            console.log('saving uid error => ',error)
        }
       
    }

    const handleLogin = () => {

        if (email == '' || password == '') {
            alert('Please Fill Both')
        } else {
            setLoading(true)
            auth.signInWithEmailAndPassword(email.trim(), password)
                .then((credentials) => {

                    const user = credentials.user;
                    console.log('loggedIn as' + JSON.stringify(user));
                  
                    setLoading(false)

                    saveData(user.uid);

                   

                    // navigation.navigate("AdminStack", { screen: 'Home' });
                    // setIsSignedIn(true);

                })
                .catch((error) => {
                    setLoading(false)
                    console.log("Error Message :" + error.message);
                    console.log("Error Code :" + error.code);
                    alert(error.message);
                })
        }

    }

    return (
        <>
            {loading &&
                (
                    <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={30} />
                        <Text style={{ color: 'white', fontSize: 15 }}>Please Wait</Text>
                    </View>
                )
            }
            <View style={styles.mainView}>
                <View style={styles.upView}>
                    <Image style={{ resizeMode: 'contain', height: '70%' }} source={require('../../assets/logo.png')} />
                </View>
                <View style={styles.downView}>
                    <Text style={styles.heading}> SignIn Type is {type} </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: -20 }}>
                        <TouchableOpacity
                            onPress={
                                () => {
                                    setType('Business')
                                }
                            }
                            style={{ flex: .3, padding: 8, backgroundColor: '#fff', alignItems: 'center' }}><Text>Business</Text></TouchableOpacity>
                        <TouchableOpacity

                            onPress={
                                () => {
                                    setType('Admin')
                                }
                            }

                            style={{ flex: .3, padding: 8, backgroundColor: '#fff', alignItems: 'center' }}><Text>Admin</Text></TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={"#fff"}
                            onChangeText={text => setEmail(text)}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={"#fff"}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                            style={styles.textInput}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text>Sign In </Text>
                    </TouchableOpacity>

                  

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                        <TouchableOpacity disabled={true}>
                            <Text style={{ color: '#fff', fontSize: 15, textDecorationLine: 'underline' }}> Don't have an account? </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                   
                                navigation.navigate('Signup')
                            }}
                        >
                            <Text style={{ color: '#4267B2', fontSize: 15, fontWeight: 'bold' }}>SignUp</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </>
    )
}

export default SignIn

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    upView: {
        flex: 2,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    downView: {
        flex: 5,
        width: '100%',
        backgroundColor: '#000',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    heading: {
        display: 'flex',
        marginTop: 30,
        marginLeft: 20,
        color: '#57B9BB',
        width: '80%',
        fontSize: 22,
        fontWeight: 'bold',

    },

    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 50

    },

    textInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        height: 52,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20,
        color: '#fff'

    },

    button: {
        display: 'flex',
        width: '90%',
        backgroundColor: '#fff',
        marginLeft: 20,
        marginBottom: 20,
        height: 52,
        borderRadius: 10,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },

    fbText: {
        color: '#fff',
    },

    fbButton: {
        display: 'flex',
        width: '90%',
        backgroundColor: '#4267B2',
        marginLeft: 20,
        marginBottom: 20,
        height: 54,
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },

    text: {
        color: '#fff',
        marginLeft: 100,
        textDecorationLine: 'underline',

    }

});
