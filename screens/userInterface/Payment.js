// import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react'
// import { Ionicons } from "@expo/vector-icons/"

// const Payment = (props) => {


//     return (
//         <View style={styles.container}>
//             <View style={styles.iconArea}>
//                 <Ionicons color="grey" name="card-outline" size={250} />
//             </View>

//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => {
//                         console.log("Pressed")
//                         props.navigation.navigate('PaymentCardForm')
//                     }}
//                 >
//                     <Text style={{ color: '#fff', fontSize: 16 }}>Add Payment Card</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default Payment

// const deviceWidth = Math.round(Dimensions.get('window').width);

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//     },
//     iconArea: {

//     },

//     buttonContainer: {
//         width: deviceWidth - 40,
//         marginBottom: 20,
//         flexDirection: 'column',
//         // backgroundColor:'#000',
//         alignItems: 'flex-end',
//         justifyContent: 'flex-end',
//         marginTop: 20,
//         flexWrap: 'wrap',
//     },
//     button: {
//         backgroundColor: '#57B9BB',
//         width: deviceWidth - 40,
//         height: 50,
//         borderRadius: 10,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',

//     },

// })
import React from 'react';
import { View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['en'] = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const disabledDaysOfWeek = [1, 2]; // Disable Mondays (1) and Tuesdays (2)

const MyCalendar = () => {
    const renderDay = (day) => {
        const isDisabled = disabledDaysOfWeek.includes(day.day);

        return (
            <View style={isDisabled ? { opacity: 0.5 } : null}>
                <Text>{day.day}</Text>
            </View>
        );
    };

    return (
        <View>
            <Calendar
                renderDay={renderDay}
            />
        </View>
    );
};
export default MyCalendar;