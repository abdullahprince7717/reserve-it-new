import { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { collection, doc, addDoc, getDocs, setDoc } from "firebase/firestore";
import { db, auth, storage } from '../../firebase/FirebaseConfig.js'
import { Button } from 'react-native-paper';

export default function AccountSetup3(props) {
    const [count, setCount] = useState(0);
    const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
        latitude: 31.4027,
        longitude: 74.2126,

    });
    const mapRef = useRef();
    const docRef = doc(db, "business_users", auth.currentUser.uid);

    const onRegionChange = (region) => {
    };
    const addLocationInfo = async () => {




        await setDoc(docRef, draggableMarkerCoord
            , { merge: true })
            .then(
                (res) => {
                    console.log("response" + res)

                })
            .catch(
                (err) => {
                    console.log("error" + err)
                });
    };

    useEffect(() => {
        addLocationInfo();
    })



    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                style={styles.map}
                onRegionChange={onRegionChange}
                initialRegion={{
                    latitude: 31.4027,
                    latitudeDelta: 0.043,
                    longitude: 74.2126,
                    longitudeDelta: 0.034,
                }}
                zoomEnabled={true}
                scrollEnabled={true}
            >
                <Marker
                    draggable
                    pinColor='#0000ff'
                    coordinate={draggableMarkerCoord}
                    onDragStart={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
                    onDragEnd={(e) => {
                        setDraggableMarkerCoord(e.nativeEvent.coordinate)

                    }}
                />
            </MapView>

            <View
                style={{
                    position: 'absolute', top: '85%', alignSelf: 'flex-end', left: '14%',
                }}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        console.log("Pressed SAVE")
                        addLocationInfo();
                        props.navigation.navigate('AccountSetup4')
                    }}
                >

                    <Text style={{ color: '#fff', fontSize: 17 }}>
                        NEXT
                    </Text>

                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%'
    },
    button: {
        backgroundColor: '#57B9BB',
        width: '110%',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});