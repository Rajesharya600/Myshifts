import React, {Component} from 'react';
import styles from '../screens/availableshiftsCss'
import {fetchApi} from '../api';
import * as Strings from '../utils/constants';
import {View, Text, ScrollView, TouchableOpacity,} from 'react-native';

export default class AvailableShifts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            helsinki : 0,
            tampere : 0,
            turku : 0
        }
    }

    componentDidMount() {
        var helsinkiCount = 0;
        var tampereCount = 0;
        var turkuCount = 0;
        var currenTime = new Date()
        const {sectionData} = this.props;
        sectionData.map((shifts) => {
        shifts.data.map((data) => {
            var endTime = new Date(data.endTime);
            if(currenTime<endTime) {
            if (data.area === 'Helsinki' ) {
                helsinkiCount = helsinkiCount + 1
            }
            else if (data.area === 'Tampere') {
                tampereCount = tampereCount + 1
            } else {
                turkuCount = turkuCount + 1
            }}
        })
    })
        this.setState({helsinki: helsinkiCount,tampere: tampereCount,turku: turkuCount })
    }

    onActiveTabPress = (tabNo) => {
        tabNo === 1
            ? this.setState({activeTab: 1})
            : tabNo === 2
                ? this.setState({activeTab: 2})
                : this.setState({activeTab: 3})
    }

    bookShifts = (id) => {
        try {
            this.props.toggleLoader()
            const data = Strings.allShifts + Strings.backSlash + id + Strings.book
            const method = Strings.postMethod
            fetchApi(data, method).then((responseJson) => {
                this.props.getShifts()
            })
        } catch (error) {
            alert(Strings.alertString.noNetwork)
        }
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
            console.log(error)
        }
    }

    render() {
        const {sectionData} = this.props;
        const {activeTab,helsinki,tampere,turku} = this.state;
        return (
            <View style={styles.body}>
                <View style={styles.topNavigation}>
                    <TouchableOpacity
                        onPress={() => this.onActiveTabPress(1)}
                        style={styles.topTab}>
                        <Text
                            style={activeTab === 1
                            ? styles.topTabActiveColor
                            : styles.topTabUnactiveColor}>
                            Helsinki({helsinki})
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onActiveTabPress(2)}
                        style={styles.topTab}>
                        <Text
                            style={activeTab === 2
                            ? styles.topTabActiveColor
                            : styles.topTabUnactiveColor}>
                            Tampere({tampere})
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.onActiveTabPress(3)}
                        style={styles.topTab}>
                        <Text
                            style={activeTab === 3
                            ? styles.topTabActiveColor
                            : styles.topTabUnactiveColor}>
                            Turku({turku})
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.contentBody}>
                    {sectionData.map((shifts, index) => {
                        var count = 0
                        {
                            shifts.data.map((data) => {
                                    var area = data.area === 'Helsinki'? 1: data.area === 'Tampere'? 2: 3
                                    if (area === activeTab) {
                                        count = count + 1
                                    }
                                })
                        }
                        if (count > 0) {
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
                            var totalTime = 0;
                            var currentBookingCount = 0;
                            var shiftTiming = []
                            {
                                shifts.data.map((data) => {
                                        if (data.booked) {
                                            shiftTiming.push({data})
                                        }
                                    })
                            }
                            {
                                shifts.data.map((data) => {
                                        var startTime = new Date(data.startTime).getTime();
                                        var endTime = new Date(data.endTime).getTime();
                                        var diff = Math.abs(startTime - endTime) / 3600000;
                                        var area = data.area === 'Helsinki'? 1: data.area === 'Tampere'? 2: 3
                                        if (date === 'Today' && activeTab === area) {
                                            var startdate = new Date(data.startTime);
                                            var enddate = new Date(data.endTime);
                                            var currenTime = new Date()
                                            currentBookingStatus = currenTime > startdate
                                                ? currenTime > enddate? 'Over': 'Ongoing' : 'Upcoming'
                                            if (currentBookingStatus !== 'Over') {
                                                currentBookingCount = currentBookingCount + 1
                                            }
                                        }
                                        totalTime = totalTime + diff
                                    })
                            }
                            var ShiftOverlapping = false;
                            if (currentBookingCount !== 0 || date !== "Today") {
                                return (
                                    <View key={index}>
                                        <View style={styles.headerView}>
                                            <Text style={styles.headerText}>{date}</Text>
                                        </View>
                                        {shifts.data.map((data) => {
                                                shiftTiming.map((shiftData) => {
                                                    var startTime = new Date(data.startTime).getTime();
                                                    var endTime = new Date(data.endTime).getTime();
                                                    var shiftStartTime = new Date(shiftData.data.startTime).getTime()
                                                    var shiftEndTime = new Date(shiftData.data.endTime).getTime()
                                                    var area = data.area === 'Helsinki'? 1: data.area === 'Tampere'? 2: 3
                                                    if (area === activeTab && shiftData.data.id !== data.id) {
                                                        if (startTime > shiftStartTime && startTime < shiftEndTime) {
                                                            ShiftOverlapping = true;
                                                        } else if (endTime > shiftStartTime && endTime < shiftEndTime) {
                                                            ShiftOverlapping = true;
                                                        } else {
                                                            ShiftOverlapping = false;
                                                        }
                                                    }
                                                })
                                                var area = data.area === 'Helsinki'? 1: data.area === 'Tampere'? 2: 3
                                                if (area === activeTab) {
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
                                                    var currenTime = new Date()
                                                    currentBookingStatus = currenTime > startdate
                                                        ? currenTime > enddate
                                                            ? 'Over'
                                                            : 'Ongoing'
                                                        : 'Upcoming'
                                                    var bookStatus = data.booked === true
                                                        ? 'Cancel'
                                                        : 'Book'
                                                    if (currentBookingStatus === 'Ongoing' || currentBookingStatus === 'Upcoming') {
                                                        if (ShiftOverlapping) {
                                                            return (
                                                                <View key={data.id} style={styles.shiftView}>
                                                                    <View style={styles.shiftTimeView}>
                                                                        <Text style={styles.shiftTimeText}>{startTime}-{endTime}</Text>
                                                                    </View>
                                                                    <Text style={[styles.shiftBookedText, {color: '#E2006A'}]}>Overlapping</Text>
                                                                    <TouchableOpacity style={[styles.shiftCancelView, {borderColor: '#cacaca'}]}>
                                                                        <Text style={[styles.ShiftCancelText, {color: '#cacaca' }]}>{bookStatus}</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )
                                                        } else {
                                                            return (
                                                                <View key={data.id} style={styles.shiftView}>
                                                                    <View style={styles.shiftTimeView}>
                                                                        <Text style={styles.shiftTimeText}>{startTime}-{endTime}</Text>
                                                                    </View>
                                                                    <Text style={styles.shiftBookedText}>{data.booked === true
                                                                            ? 'Booked'
                                                                            : null}</Text>
                                                                    <TouchableOpacity
                                                                        onPress={bookStatus === 'Book'? () => this.bookShifts(data.id): currentBookingStatus !== 'Ongoing'? () => this.cancelShifts(data.id): null}
                                                                        style={[styles.shiftCancelView, {borderColor: data.booked
                                                                                ?currentBookingStatus === 'Ongoing'?'#cacaca' : '#E2006A'
                                                                                : '#16A64D'
                                                                        }
                                                                    ]}>
                                                                        <Text
                                                                            style={[ styles.ShiftCancelText, {color: data.booked
                                                                                    ?currentBookingStatus === 'Ongoing'?'#cacaca' : '#E2006A'
                                                                                    : '#16A64D'
                                                                            }
                                                                        ]}>{bookStatus}</Text>
                                                                    </TouchableOpacity>
                                                                </View>

                                                            )
                                                        }
                                                    }
                                                }
                                            })
                                        }
                                    </View>
                                )
                            }
                        }
                    })
                    }
                </ScrollView>
            </View>
        );

    }
}
