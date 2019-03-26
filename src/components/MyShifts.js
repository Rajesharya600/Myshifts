import React, {Component} from 'react';
import styles from '../screens/myshiftsCss'
import {fetchApi} from '../api';
import * as Strings from '../utils/constants';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';

export default class MyShifts extends Component {
    constructor(props) {
        super(props);
    }

    cancelShifts = (id) => {
        try {
            this.props.toggleLoader()
            const data = Strings.allShifts + Strings.backSlash + id + Strings.cancel
            const method = Strings.postMethod
            fetchApi(data, method).then((responseJson) => {
                this.props.getShifts()
            })
        } catch (error) {
            alert(Strings.alertString.noNetwork)
        }
    }

    render() {
        const {sectionData} = this.props;
        return (
            <ScrollView style={styles.body}>
                {sectionData.map((shifts, index) => {
                    var today = new Date().toDateString();
                    var tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
                    var date = ""
                    if (today === shifts.title) {
                        date = "Today"
                    } else if (tomorrow === shifts.title) {
                        date = "Tomorrow"
                    } else {
                        date = shifts.title
                    }
                    var totalShifts = 0;
                    var totalTime = 0;
                    var currenTime = new Date().getTime()
                    {
                        shifts.data.map((data) => {
                            if(data.booked) {
                                var startTime = new Date(data.startTime).getTime();
                                var endTime = new Date(data.endTime).getTime();
                                var diff = Math.abs(startTime - endTime) / 3600000;
                                totalTime = totalTime + diff
                                if(currenTime<endTime) {
                                    totalShifts = totalShifts + 1
                                }
                            }
                            })
                    }
                    if(totalShifts>0) {
                    return (
                        <View key={index}>
                            <View style={styles.headerView}>
                                <Text style={styles.headerText}>{date}</Text>
                                <Text style={styles.headerShiftCount}>{totalShifts} shifts, {totalTime} h</Text>
                            </View>
                            {shifts.data.map((data) => {
                                    var startdate = new Date(data.startTime);
                                    var hours = startdate.getHours();
                                    var minutes = startdate.getMinutes() === 0
                                        ? '00'
                                        : startdate.getMinutes();
                                    var startTime = hours + ':' + minutes

                                    var enddate = new Date(data.endTime);
                                    var hours = enddate.getHours();
                                    var minutes = enddate.getMinutes() === 0
                                        ? '00'
                                        : enddate.getMinutes();
                                    var endTime = hours + ':' + minutes
                                    var shiftStartTime = new Date(data.startTime).getTime();
                                    var shiftEndTime = new Date(data.endTime).getTime();
                                    var ongoingShift = shiftStartTime<currenTime && currenTime<shiftEndTime?true:false
                                    if(data.booked && currenTime<shiftEndTime) {
                                        if(ongoingShift) {
                                            return (
                                                <View key={data.id} style={styles.shiftView}>
                                                    <View style={styles.shiftTimeView}>
                                                        <Text style={styles.shiftTimeText}>{startTime}-{endTime}</Text>
                                                        <Text style={styles.shiftAreaText}>{data.area}</Text>
                                                    </View>
                                                    <TouchableOpacity style={[styles.shiftCancelView,{borderColor: '#cacaca'}]}>
                                                    <Text style={[styles.ShiftCancelText,{color:'#cacaca'}]}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        } else {
                                    return (
                                        <View key={data.id} style={styles.shiftView}>
                                            <View style={styles.shiftTimeView}>
                                                <Text style={styles.shiftTimeText}>{startTime}-{endTime}</Text>
                                                <Text style={styles.shiftAreaText}>{data.area}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.cancelShifts(data.id)} style={styles.shiftCancelView}>
                                            <Text style={styles.ShiftCancelText}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}}
                                })
                            }
                        </View>
                    )}
                })
                }
            </ScrollView>
        );
    }
}
