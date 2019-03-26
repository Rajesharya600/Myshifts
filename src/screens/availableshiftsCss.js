import {StyleSheet,Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({

    body: {
        marginTop: 20,
    },
    topNavigation: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    topTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topTabActiveColor: {
        color: '#004FB4',
        fontSize: 16,
        fontWeight: '400', 
    },
    topTabUnactiveColor: {
        color: '#A4B8D3',
        fontSize: 16,
        fontWeight: '400', 
    },
    contentBody: {
        marginBottom: 70,
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
        flex:2,
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
        width: 100,
        flex:2,
        marginRight: 10,
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
    },
    shiftBookedText: {
        color: '#4F6C92',
        textAlign:'right',
        marginRight: 10,
        fontSize: 16,
        flex: 2,
    }
})