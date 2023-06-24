import React, { useEffect, useState, useContext, useRef } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import HorizontalScrollView from "../../components/home/HorizontalScrollView";
// import BusinessCard from  '../../components/explore/Card.js';
import PopularHorizontalScrollView from "../../components/home/PopularCardHorizontalScrollView.js";
import { FAB } from "react-native-paper";
import { db, auth } from "../../firebase/FirebaseConfig.js";
import {
    doc,
    getDoc,
    setDoc,
    collection,
    getDocs,
    where,
    query,
} from "firebase/firestore";
import { CredentialsContext } from "../../global/CredentialsContext";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
// import storage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

function HomeScreen(props) {
    const [searchQuery, setSearchQuery] = useState();
    const onChangeSearch = (query) => setSearchQuery(query);
    const [queryResult, setQueryResult] = useState([]);
    const [queryResult1, setQueryResult1] = useState([]);
    const [checked, setChecked] = useState("first");
    const [storedCredentials, setStoredCredentials] =
        useContext(CredentialsContext);

    const collectionRef = collection(db, "business_users");

    const getQueryResult = async () => {
        let q = query(collectionRef, where("category", "==", "salon"));

        let q1 = query(collectionRef, where("category", "==", "doctor"));

        await getDocs(q)
            .then((res) => {
                setQueryResult(
                    res.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );

                // console.log("response " + res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                // console.log("response " + res);
                console.log(queryResult);
            })
            .catch((err) => {
                console.log(err);
            });
        await getDocs(q1)
            .then((res) => {
                setQueryResult1(
                    res.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );

                // console.log("response " + res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                // console.log("response " + res);
                console.log(queryResult1);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const sendVerificationEmail = async () => {
        const user = auth.currentUser.email;
        if (user) {
            try {
                await user.sendEmailVerification();
                console.log('Verification email sent successfully.');
            } catch (error) {
                console.error('Error sending verification email:', error);
            }
        }
    };


    useEffect(() => {
        // props?.route?.params?.query ? setSearchQuery(props?.route?.params?.query) : null;
        getQueryResult();
        console.log(auth.currentUser.email);
        // console.log(queryResult)
        // console.log(queryResult1)
    }, [searchQuery]);

    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    // const getPermission = async () => {
    //         if (Device.isDevice) {
    //             const { status: existingStatus } =
    //                 await Notifications.getPermissionsAsync();
    //             let finalStatus = existingStatus;
    //             if (existingStatus !== "granted") {
    //                 const { status } = await Notifications.requestPermissionsAsync();
    //                 finalStatus = status;
    //             }
    //             if (finalStatus !== "granted") {
    //                 alert("Enable push notifications to use the app!");
    //                 await storage.setItem("expopushtoken", "");
    //                 return;
    //             }
    //             const token = (await Notifications.getExpoPushTokenAsync()).data;
    //             await storage.setItem("expopushtoken", token);
    //         } else {
    //             alert("Must use physical device for Push Notifications");
    //         }

    //         if (Platform.OS === "android") {
    //             Notifications.setNotificationChannelAsync("default", {
    //                 name: "default",
    //                 importance: Notifications.AndroidImportance.MAX,
    //                 vibrationPattern: [0, 250, 250, 250],
    //                 lightColor: "#FF231F7C",
    //             });
    //         }
    //     };

    // useEffect(() => {
    //     const getPermission = async () => {
    //         if (Device.isDevice) {
    //             const { status: existingStatus } =
    //                 await Notifications.getPermissionsAsync();
    //             let finalStatus = existingStatus;
    //             if (existingStatus !== "granted") {
    //                 const { status } = await Notifications.requestPermissionsAsync();
    //                 finalStatus = status;
    //             }
    //             if (finalStatus !== "granted") {
    //                 alert("Enable push notifications to use the app!");
    //                 await storage.setItem("expopushtoken", "");
    //                 return;
    //             }
    //             const token = (await Notifications.getExpoPushTokenAsync()).data;
    //             await storage.setItem("expopushtoken", token);
    //         } else {
    //             alert("Must use physical device for Push Notifications");
    //         }

    //         if (Platform.OS === "android") {
    //             Notifications.setNotificationChannelAsync("default", {
    //                 name: "default",
    //                 importance: Notifications.AndroidImportance.MAX,
    //                 vibrationPattern: [0, 250, 250, 250],
    //                 lightColor: "#FF231F7C",
    //             });
    //         }
    //     };

    //     getPermission();

    //     notificationListener.current =
    //         Notifications.addNotificationReceivedListener((notification) => {
    //             setNotification(notification);
    //         }, []);

    //     responseListener.current =
    //         Notifications.addNotificationResponseReceivedListener((response) => { });

    //     return () => {
    //         Notifications.removeNotificationSubscription(
    //             notificationListener.current
    //         );
    //         Notifications.removeNotificationSubscription(responseListener.current);
    //     };
    // }, []);

    // const onClick = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "Title",
    //             body: "body",
    //             data: { data: "data goes here" },
    //         },
    //         trigger: {
    //             hour: 7,
    //             minute: 0,
    //             repeats: true,
    //         },
    //     });
    // };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    style={{ height: "100%", resizeMode: 'contain' }}
                    source={require("../../assets/homeLogo.png")}
                />
            </View>

        
            <View style={{ flexDirection: 'row', margin:10 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity >
                    <View style={{ height: 80, width: 80, backgroundColor: '#57B9BB', borderRadius: 40,alignItems:'center' }}>
                        <Image source={require('../../assets/doc-logo.jpg')} style={{ height: 80, width: 80, borderRadius: 40 }} />
                        <Text style={{fontSize:12}} >Doctors</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{marginStart:5}}>
                    <View style={{ height: 80, width: 80, backgroundColor: '#57B9BB', borderRadius: 40,alignItems:'center' }}>
                        <Image source={require('../../assets/salon-logo.jpg')} style={{ height: 80, width: 80, borderRadius: 40,resizeMode:'contain' }} />
                        <Text style={{fontSize:12}} >Salons</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{marginStart:5}}>
                    <View style={{ height: 80, width: 80, backgroundColor: '#57B9BB', borderRadius: 40,alignItems:'center' }}>
                        <Image source={require('../../assets/plate-logo.jpg')} style={{ height: 80, width: 80, borderRadius: 40,resizeMode:'contain' }} />
                        <Text style={{fontSize:12}} >Restaurant</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{marginStart:5}}>
                    <View style={{ height: 80, width: 80, backgroundColor: '#57B9BB', borderRadius: 40,alignItems:'center' }}>
                        <Image source={require('../../assets/movies.jpeg')} style={{ height: 80, width: 80, borderRadius: 40,resizeMode:'contain' }} />
                        <Text style={{fontSize:12}} >Movies</Text>
                    </View>
                </TouchableOpacity>
                
                </ScrollView>
            </View>
       

            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("pressed");
                            // getPermission();
                            props.navigation.navigate("Explore", { query: "doctor" });
                        }}
                    >
                        <HorizontalScrollView
                            image={require("../../assets/doc-logo.jpg")}
                            name="Doctor"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("pressed");
                            props.navigation.navigate("Explore", { query: "salon" });
                        }}
                    >
                        <HorizontalScrollView
                            image={require("../../assets/salon-logo.jpg")}
                            name="Salon"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("pressed");
                            props.navigation.navigate("Explore", { query: "restaurant" });
                        }}
                    >
                        <HorizontalScrollView
                            image={require("../../assets/plate-logo.jpg")}
                            name="Restaurant"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("pressed");
                            props.navigation.navigate("Explore", { query: "movie" });
                        }}
                    >
                        <HorizontalScrollView
                            image={require("../../assets/logo.png")}
                            name="Movie"
                        />
                    </TouchableOpacity>
                </ScrollView> */}
            {/* </View> */}

            <View style={styles.listView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        {/* <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontSize: 25, color: 'black', margin: 10 }}>Here are some popular Salons</Text>
                        </View> */}

                        {/* <View style={{ backgroundColor: "#fff" }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {queryResult.map((item, index) => {


                                })}
                                <TouchableOpacity onPress={() => {
                                    console.log("pressed")
                                    // props.navigation.navigate("Explore", { query: "doctor" })
                                }}>
                                    <PopularHorizontalScrollView
                                        
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    console.log("pressed")
                                    // props.navigation.navigate("Explore", { query: "salon" })
                                }}>
                                    <PopularHorizontalScrollView />
                                </TouchableOpacity>

                            </ScrollView>
                        </View> */}
                        <View style={{  marginTop:5 }}>
                            <Text style={{ fontSize: 18, color: "black", marginStart: 10 }}>
                                Businesses List{" "}
                            </Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: "#fff",

                                flexDirection: "column",
                            }}
                        >
                            <ScrollView
                                // horizontal={true}
                                // showsHorizontalScrollIndicator={false}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("pressed");
                                        // props.navigation.navigate("Explore", { query: "doctor" })
                                    }}
                                >
                                    <PopularHorizontalScrollView />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("pressed");
                                        // props.navigation.navigate("Explore", { query: "salon" })
                                    }}
                                >
                                    <PopularHorizontalScrollView />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default HomeScreen;

const deviceWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom: 55,
        // backgroundColor: '#000',
    },
    logo: {
        width: deviceWidth,
        flex: 0.65,
        paddingTop: 15,
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    
    listView: {
        flex: 5.5,
        width: deviceWidth - 5,
        justifyContent: "center",
        flexWrap: "wrap",
        // alignItems: 'center',
        // backgroundColor: '#fff',
    },
});
