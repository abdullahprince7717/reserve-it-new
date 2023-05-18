import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons/"
import { db, auth } from '../../firebase/FirebaseConfig.js'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios"

const EditProfile = (props) => {

    const [userData, setUserData] = useState()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [category, setCategory] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    // const [password,setPassword] = useState('');
    const [image, setImage] = useState({ uri: 'hahahahahahah' });

    useEffect(() => {
        const myDoc = doc(db, "business_users", auth.currentUser.uid)
        // const myDoc = doc(db, "business_users", "test")
        getDoc(myDoc)
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUserData(snapshot.data())
                    setName(snapshot.data().name)
                    setPhone(snapshot.data().phone)
                    setEmail(snapshot.data().email)
                    setBusinessName(snapshot.data().business_name)
                    setBusinessAddress(snapshot.data().business_address)
                    setBusinessEmail(snapshot.data().business_email)
                    setCategory(snapshot.data().category)
                    setBusinessPhone(snapshot.data().business_phone)
                    setBusinessDescription(snapshot.data().business_description)
                    setInstagram(snapshot.data().instagram)
                    setFacebook(snapshot.data().facebook)

                    // console.log(snapshot.data())
                    // console.log(myDoc.uid)
                }
                else {
                    console.log("No User Data")
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
        console.log(userData)
        console.log(auth.currentUser.uid)

    }, [])
    const pickImage = async () => {


        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [5, 10],
            // quality: 1,
            base64: true,
        });
        console.log("result: " + result);
        console.log(JSON.stringify(result));
        console.log("result.uri: " + result.uri);

        if (!result.cancelled) {
            setImage(result);
        }
    };

    function Update(value, merge) {
        const myDoc = doc(db, "business_users", auth.currentUser.uid)

        setDoc(myDoc, value, { merge: merge })
            .then(() => {
                console.log("Updated")
                props.navigation.goBack()
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, }}>
                    Personal Details
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: -15 }}>
                    <FontAwesome color="#57B9BB" name="user-o" size={23} style={{ margin: 10, marginTop: 25, }} />
                    <TextInput
                        placeholder="Full Name"
                        value={name}
                        onChangeText={(value) => setName(value)}
                        placeholderTextColor={"grey"}
                        style={styles.textInput}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <MaterialCommunityIcons color="#57B9BB" name="email-outline" size={23} style={{ margin: 10, marginTop: 25, }} />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        placeholderTextColor={"grey"}
                        style={styles.textInput}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <Feather color="#57B9BB" name="phone" size={23} style={{ margin: 10, marginTop: 25, }} />
                    <TextInput
                        placeholder="Phone Number"
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
                        placeholderTextColor={"grey"}
                        style={styles.textInput}
                    />
                </View>


                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, marginTop: 20 }}>
                    Business Details
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: -15 }}>
                    <Ionicons color="#57B9BB" name="business" size={23} style={{ margin: 10, marginTop: 25, }} />
                    <TextInput
                        placeholder="Business Name"
                        value={businessName}
                        onChangeText={(value) => setBusinessName(value)}
                        placeholderTextColor={"grey"}
                        style={styles.textInput}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <MaterialCommunityIcons color="#57B9BB" name="email-outline" size={23} style={{ margin: 10, marginTop: 25, }} />
                    <TextInput
                        placeholder="Business Email"
                        value={businessEmail}
                        onChangeText={(value) => setBusinessEmail(value)}
                        placeholderTextColor={"grey"}
                        style={styles.textInput}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <MaterialCommunityIcons color="#57B9BB" name="map-marker-outline" size={23} style={{ margin: 10, marginTop: 25, }} />
                    <TextInput
                        placeholder="Business Address"
                        value={businessAddress}
                        onChangeText={(value) => setBusinessAddress(value)}
                        placeholderTextColor={"grey"}
                        style={styles.textInput}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <Feather color="#57B9BB" name="phone" size={23} style={{ margin: 10, marginTop: 25, }} />
                    <TextInput
                        placeholder="Business Description "
                        value={businessDescription}
                        onChangeText={(value) => setBusinessDescription(value)}
                        placeholderTextColor={"grey"}
                        multiline={true}
                        underlineColorAndroid='transparent'
                        style={styles.description}

                    />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, marginTop: 20 }}>
                    Social Media
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: -15 }}>
                    <Feather color="red" name="instagram" size={23} style={{ margin: 10, marginTop: 25, }} />
                    <TextInput
                        placeholder="Instagram"
                        value={instagram}
                        onChangeText={(value) => setInstagram(value)}
                        placeholderTextColor={"grey"}
                        style={styles.textInput}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <Feather color="blue" name="facebook" size={23} style={{ margin: 10, marginTop: 25, }} />
                    <TextInput
                        placeholder="Facebook"
                        value={facebook}
                        onChangeText={(value) => setFacebook(value)}
                        placeholderTextColor={"grey"}
                        style={styles.textInput}
                    />
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, marginTop: 20 }}>
                    Banner Image
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: -15 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, marginTop: 20 }}>
                        Select a Banner Image
                    </Text>

                    {/* <AddImages uri = {image} /> */}
                    <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>

                        <View style={{ flexDirection: "row", margin: 10 }}>
                            {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, borderRadius: 13 }} />}

                            <View style={{ justifyContent: 'center', margin: 10 }}>
                                {image &&
                                    <Button icon="delete" color='red' onPress={deleteImage} />}
                            </View>

                        </View>

                        <View style={{ margin: 15, marginBottom: 20 }}>
                            <Button icon="camera" mode="outlined" color='#57B9BB' onPress={pickImage}>
                                {image ? <Text>Reselect the picture</Text> : <Text>Select a Picture from Gallery</Text>}
                            </Button>
                        </View>

                    </View>

                </View>

                <View style={{ justifyContent: 'center', margin: 20, marginTop: 40 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            console.log("Pressed SAVE")
                            Update({
                                name: name,
                                email: email,
                                phone: phone,
                                businessName: businessName,
                                businessEmail: businessEmail,
                                businessAddress: businessAddress,
                                businessDescription: businessDescription,
                                instagram: instagram,
                                facebook: facebook,
                                bannerImage: bannerImage,
                            }, true);
                            // navigation.navigate('')
                        }}
                    >

                        <Text style={{ color: '#fff', fontSize: 17 }}>
                            SAVE
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default EditProfile;

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    textInput: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#000',
        height: 45,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20,
        color: '#000',
        padding: 10,

    },
    description: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#000',
        height: 95,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20,
        color: '#000',
        padding: 10,

    },
    button: {
        backgroundColor: '#57B9BB',
        width: deviceWidth - 45,
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

});
