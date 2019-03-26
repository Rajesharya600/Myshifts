import React, {Component} from 'react';
import styles from '../screens/homepageCss'
import {fetchApi} from '../api/index';
import MyShifts from './MyShifts';
import AvailableShifts from './AvailableShifts';
import * as Strings from '../utils/constants';
import {View, Text, TouchableOpacity,ActivityIndicator} from 'react-native';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            allShifts: null,
            sectionData: null,
            fetchingData: true,
        }
    }

    componentDidMount() {
        try {
            const data = Strings.allShifts
            const method = Strings.getMethod
            fetchApi(data,method).then((responseJson) => {
                this.setState({allShifts: responseJson})
                this.convertShiftData()
            })
        } catch (error) {
            alert(Strings.alertString.noNetwork)
        }
    }     

    getShifts = () => {
        try {
            const data = Strings.allShifts
            const method = Strings.getMethod
            fetchApi(data,method).then((responseJson) => {
                this.setState({allShifts: responseJson})
                this.convertShiftData()
            })
        } catch (error) {
            alert(Strings.alertString.noNetwork)
        }
    }

    toggleLoader = () => {
        if(!this.state.fetchingData) {
        this.setState({fetchingData:true})
        }
    }

    convertShiftData = () => {
        const sectionData = []
        const {allShifts} = this.state;
        var dates = []
        allShifts.map((shifts) => {
            var d = new Date(shifts.startTime).toDateString();
            dates.push(d)
        });
        const uniqueDates = [...new Set(dates)];
        uniqueDates.map((date) => {
            var data = []
            allShifts.map((shifts) => {
                var d = new Date(shifts.startTime).toDateString();
                if (d === date) {
                    data.push(shifts)
                }
            })
            sectionData.push({'title': date, 'data': data})
        });
        this.setState({sectionData: sectionData,fetchingData: false})
    }

    onActiveTabPress = (tabNo) => {
        tabNo === 1
            ? this.setState({activeTab: 1})
            : this.setState({activeTab: 2})
    }

    render() {
        const {activeTab, allShifts, sectionData,fetchingData} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    {allShifts !== null && sectionData !== null && activeTab === 1
                        ? <MyShifts sectionData={sectionData} getShifts={this.getShifts} toggleLoader={this.toggleLoader}/>
                        : null}
                    {allShifts !== null && sectionData !== null && activeTab === 2
                        ? <AvailableShifts sectionData={sectionData} getShifts={this.getShifts} toggleLoader={this.toggleLoader}/>
                        : null}
                </View>
                {fetchingData? <View style={styles.loading}>
                <ActivityIndicator color={'#4F6C92'} size={'large'}/>
                </View> : null}
                <View style={styles.bottomNav}>
                    <TouchableOpacity
                        onPress={() => this.onActiveTabPress(1)}
                        style={styles.bottomTab}>
                        <Text
                            style={activeTab === 1
                            ? styles.bottomTabActiveColor
                            : styles.bottomTabUnactiveColor}>
                            My shifts
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onActiveTabPress(2)}
                        style={styles.bottomTab}>
                        <Text
                            style={activeTab === 2
                            ? styles.bottomTabActiveColor
                            : styles.bottomTabUnactiveColor}>
                            Available shifts
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
