import {StyleSheet,Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({

    container: {
        height: SCREEN_HEIGHT,
    },
    body: {
        height:SCREEN_HEIGHT-50,
    },
    bottomNav: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F4F8',
    },
    bottomTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTabActiveColor: {
        color: '#004FB4'
    },
    bottomTabUnactiveColor: {
        color: '#CBD2E1'
    },
    loading: {
        alignSelf :'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex :2,
        marginTop: 300,
        position :'absolute'
    }
})