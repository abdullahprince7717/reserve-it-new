import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, useWindowDimensions, StatusBar, } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Button, Searchbar } from 'react-native-paper'
import CustomerCard from '../../components/adminUIComponents/home/CustomerCard.js'
import { db, auth, } from "../../firebase/FirebaseConfig.js";
import { doc, getDoc, setDoc, collection, getDocs, where, query } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native';

const Home = (props) => {

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState();
    const [searchQuery2, setSearchQuery2] = useState();
    const onChangeSearch = query => setSearchQuery(query);
    const onChangeSearch2 = query => setSearchQuery2(query);
    const [queryResult, setQueryResult] = useState([]);
    const [queryResult2, setQueryResult2] = useState([]);


    const customerCollectionRef = collection(db, "users")
    const collectionRef = collection(db, "business_users")

    const getQueryResult = async () => {
        let q = query(collectionRef, where("name", "==", searchQuery))
        await getDocs(q)
            .then((res) => {
                setQueryResult(res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const getQueryResult2 = async () => {
        let q = query(collectionRef, where("name", "==", searchQuery2))
        await getDocs(q)
            .then((res) => {
                setQueryResult(res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useFocusEffect(
        React.useCallback(() => {
            props?.route?.params?.query ?
                setSearchQuery(props?.route?.params?.query) : null

        }, []))

    useEffect(() => {
        // props?.route?.params?.query ? setSearchQuery(props?.route?.params?.query) : null;
        getQueryResult();
        getQueryResult2();
        // console.log(auth.currentUser.email)
        console.log(searchQuery)
    }, []);



    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', }}>
            <View style={styles.searchBar}>
                <View style={{ flexDirection: 'row', }}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch2}
                        value={searchQuery2}
                        style={styles.searchBar}
                    />
                    <Button color="#000" mode="contained" style={{ height: 40, padding: 0, width: 30, borderColor: "#fff", marginTop: 14, borderRadius: 20 }}
                        onPress={() => {
                            console.log('Pressed')
                            getQueryResult2()
                        }}>

                        <Ionicons name="search" size={23} color='#fff' />

                    </Button>
                </View>
            </View>

            <View style={{ width: '93%', backgroundColor: 'grey', height: 2 }}></View>

            <View style={{ width: '90%', marginTop: 10 }}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    {queryResult2?.map((item, index) => (

                        <CustomerCard title={item.name} phone={item.phone} email={item.email}
                            onPress={() => {
                                console.log('Pressed')
                                props.navigation.navigate('ClientProfile', { data: queryResult2[index] })
                            }} />
                    ))}

                </ScrollView>
            </View>
        </View>
    );

    const SecondRoute = () => (

        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
            <View style={styles.searchBar}>
                <View style={{ flexDirection: 'row' }}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={styles.searchBar}
                    />
                    <Button color="#000" mode="contained" style={{ height: 40, padding: 0, width: 30, borderColor: "#fff", marginTop: 14, borderRadius: 20 }}
                        onPress={() => {
                            console.log('Pressed')
                            getQueryResult()
                        }}>

                        <Ionicons name="search" size={23} color='#fff' />

                    </Button>
                </View>
            </View>

            <View style={{ width: '93%', backgroundColor: 'grey', height: 2 }}></View>


            <View style={{ width: '90%', marginTop: 10 }}>

                <ScrollView >

                    {queryResult?.map((item, index) => (
                        // <Text>{item.id}</Text>
                        // item.business_name === "" ? null :

                        <CustomerCard title={item.business_name} phone={item.business_phone} email={item.business_email}
                            onPress={() => {
                                console.log('Pressed')
                                props.navigation.navigate('BusinessProfile', { data: queryResult[index] })
                            }} />
                    ))}


                </ScrollView>
            </View>
        </View>

    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        // third: ThirdRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#fff' }}
            style={{ backgroundColor: '#000', }}
        />
    );

    const [routes] = React.useState([
        { key: 'first', title: 'Customers' },
        { key: 'second', title: 'Businesses' },
        // { key: 'third', title: 'Details' },
    ]);

    // const renderScene = ({ route }) => {
    //     switch (route.key) {
    //         case 'first':
    //             return <FirstRoute prop={props} />;
    //         case 'second':
    //             return <SecondRoute />;
    //         default:
    //             return null;
    //     }
    // };


    return (
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
            {/* <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>

                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal> */}
        </View>
    );
};

export default Home;

const deviceWidth = Math.round(Dimensions.get('window').width);

styles = StyleSheet.create({

    container: {

        flex: 1,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // backgroundColor: 'grey',
    },
    searchView: {
        flex: 1.1,
        width: deviceWidth,
        alignItems: 'flex-start',
        paddingBottom: 10,
        backgroundColor: '#000',
        flexDirection: 'column',
    },
    searchBar: {
        width: '88%',
        margin: 10,
        marginLeft: 1,
        marginRight: 5,
        flexDirection: 'row',
        borderRadius: 20,
        // backgroundColor: '#000',
    },
});