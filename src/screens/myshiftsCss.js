import {StyleSheet,Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({

    body: {
        marginTop: 20,
    },
    headerView: {
        height: 50,
        width: SCREEN_WIDTH,
        borderBottomWidth: 1,
        borderColor: '#cacaca',
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F4F8',
    },
    headerText: {
        color: '#4F6C92',
        fontSize: 16,
        fontWeight:'bold',
        marginLeft: 30,
    },
    headerShiftCount:{
        color: '#cacaca',
        fontSize: 17,
        marginLeft: 30,
    },
    shiftView: {
        height: 80,
        borderBottomWidth: 1,
        marginTop: 0,
        flex:1,
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#cacaca',
        justifyContent:'flex-start',
        width: SCREEN_WIDTH,
    },
    shiftTimeView: {
        flexDirection: 'column',
        marginLeft: 30,
        flex:1,
        justifyContent:'center',
    },
    shiftTimeText : {
        color: '#4F6C92',
        fontSize: 17,
    },
    shiftAreaText: {
        color: '#CBD2E1',
        fontSize: 16,
    },
    shiftCancelView: {
        width: 120,
        flex:1,
        marginRight: 30,
        marginLeft: 70,
        height: 40,
        borderWidth: 1,
        borderRadius: 35,
        borderColor: '#E2006A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ShiftCancelText: {
        color: '#E2006A',
        fontWeight: 'bold'
    }
})