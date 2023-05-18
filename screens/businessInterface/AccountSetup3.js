import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function App() {
    const [count, setCount] = useState(0);
    const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
        latitude: 31.4027,
        // latitudeDelta: 0.0043,
        longitude: 74.2126,
        // longitudeDelta: 0.0034,
    });
    const mapRef = useRef();

    const onRegionChange = (region) => {
    };



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
                    onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
                />
            </MapView>
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
    mapOverlay: {
        position: "absolute",
        bottom: 50,
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 5,
        padding: 16,
        left: "25%",
        width: "50%",
        textAlign: "center"
    }
});