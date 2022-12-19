/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
// import { useFocusEffect,CommonActions,TabActions } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Planning(){
  const [all_plans, set_all_plans] = React.useState([]);
  const [plan_title, onchange_plan_title] = React.useState("");
  const [time, setTime] = React.useState(0);
  const [timeOn, set_TimeOn] = React.useState(false);
  const [startTime, set_startTime] = React.useState(0);
  const [previousShow, setPreviousShow] = React.useState('');
  const check_all_plans = async() =>{
    // AsyncStorage.setItem('@all_plans', 'null');
    const asyncData = await AsyncStorage.getItem('@all_plans');
    if(asyncData != null && asyncData != 'null'){
      let data = JSON.parse(asyncData);
      let lastTime = returnSentTime(data[0]._startTime);
      // console.log(lastTime);
      set_all_plans(data);
      setPreviousShow(lastTime);
      // console.log(data);
    }
    
  }

  // const startTimer=()=>{
  //   set_TimeOn(true);
  //   let interval = null;
  //   interval = setInterval(()=>{
  //     setTime(prevTime => prevTime + 10)
  //   },10)
  // }
  // const stopTimer=()=>{
  //   set_TimeOn(false);
  //   setTime(0);
  //   clearInterval(null);
  // }
  const createInitalStart = () =>{
    set_startTime(Date.now());
    // let all_plans_data = all_plans;
    // let time = {
    //   startTime:Date.now(),
    //   timeSpent:null,
    //   endTime:null,
    // };
    // all_plans_data.push(time);
    // AsyncStorage.setItem('@all_plans', JSON.stringify(all_plans_data));
  }

  const getTheTotalHours = () =>{
    let totalHours = 0;
    all_plans.map((item,index)=>{
      totalHours = totalHours + item._timeSpent;
    })
    return totalHours;
  }


  const createTimeEnd = () =>{
    let updated_data = {
      _description:plan_title,
      _startTime:startTime,
      _timeSpent:time,
      _endTime:Date.now(),
    };
    setTime(0);
    onchange_plan_title("");
    let copiedArray = [...all_plans];
    copiedArray.push(updated_data);
    AsyncStorage.setItem('@all_plans', JSON.stringify(copiedArray));
    set_all_plans(copiedArray);

  }


  const returnSentTime = (Timestring) =>{
		var senttimestring = new Date(Timestring);
		if (areSameDate(Date.now(),senttimestring)=='true') {
		  return 'Today';
		}
		else if (areSameDate(Date.now(),senttimestring)=='yesterday') {
		  return 'Yesterday';
		}
		else if (areSameDate(Date.now(),senttimestring)=='thisweek') {
		  return 'This week';
		}
		else if (areSameDate(Date.now(),senttimestring)=='false'){
		  return senttimestring.getFullYear()+'/'+(senttimestring.getMonth()+1)+'/'+senttimestring.getDate();
		}
	}
	const tenths = (hourmin) =>{
		if (hourmin<10) {
		  return (0+''+hourmin);
		}
		else {
		  return hourmin;
		}
	}
	const dayText = (day) =>{
		if (day==0) {
		  return 'Sun';
		}
		else if (day==1) {
		  return 'Mon';
		}
		else if (day==2) {
		  return 'Tue';
		}
		else if (day==3) {
		  return 'Wed';
		}
		else if (day==4) {
		  return 'Thu';
		}
		else if (day==5) {
		  return 'Fri';
		}
		else {
		  return 'Sat';
		}
	}
	const areSameDate = (d1, d2) =>{
		var d1 = new Date(d1);
		var d2 = new Date(d2);
		if (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate()) {
		  return 'true';
		}
		else if (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && (d1.getDate() - d2.getDate() == 1)) {
		  return 'yesterday';
		}
		else if (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && (d1.getDate() - d2.getDate() < 8)) {
		  return 'thisweek';
		}
		else {
		  return 'false';
		}
	}  
  
 
  const checkDateValidity = () =>{
    <View style={styles.plan_header}>
        <Text style={styles.plan_header_title}>Today</Text>
        <View style={styles.time_spent_display}>
            <Text style={styles.plan_header_total_hours}> {("0"+Math.floor((getTheTotalHours()/60000)%60)).slice(-2)}:</Text>
            <Text style={styles.plan_header_total_hours}> {("0"+Math.floor((getTheTotalHours()/1000)%60)).slice(-2)}:</Text>
            <Text style={styles.plan_header_total_hours}> {("0"+(getTheTotalHours()/10)%60).slice(-2)}</Text>
        </View>
    </View>
  }
  const DateInfo = ({ item}) => (
      <View style={styles.plan_header}>
          <Text style={styles.plan_header_title}>{returnSentTime(item._startTime)}</Text>
          <View style={styles.time_spent_display}>
              <Text style={styles.plan_header_total_hours}> {("0"+Math.floor((getTheTotalHours()/60000)%60)).slice(-2)}:</Text>
              <Text style={styles.plan_header_total_hours}> {("0"+Math.floor((getTheTotalHours()/1000)%60)).slice(-2)}:</Text>
              <Text style={styles.plan_header_total_hours}> {("0"+(getTheTotalHours()/10)%60).slice(-2)}</Text>
          </View>
      </View>
  );

  checkDateChange = (startTime) =>{
    let lastTime = returnSentTime(startTime);
    if(lastTime != previousShow){
      return true;
    }else{
      return false;
    }
  }
  const renderItem = ({ item,index }) => (
    <View style={[styles.plans,{marginLeft:'2.5%'}]} key={item._startTime}>
        {
          index == 0?(
              <DateInfo
                item={item}
                // onPress={() => setSelectedId(item.id)}
                // backgroundColor={{ backgroundColor }}
                // textColor={{ color }}
              />
          ):(
            checkDateChange(item._startTime) == true?(
              <DateInfo
                item={item}
                // onPress={() => setSelectedId(item.id)}
                // backgroundColor={{ backgroundColor }}
                // textColor={{ color }}
              />
            ):(null)
          )
        }
        <View style={styles.list_plan} key={item._startTime}>
            <View>
                <Text style={styles.list_plan_title}>{item._description}</Text>
                <Text style={styles.list_plan_description}>DESCRIPTION</Text>
            </View>

            <View style={styles.time_spent_display}>
                <Text style={styles.list_plan_hours}> {("0"+Math.floor((item._timeSpent/60000)%60)).slice(-2)}:</Text>
                <Text style={styles.list_plan_hours}> {("0"+Math.floor((item._timeSpent/1000)%60)).slice(-2)}:</Text>
                <Text style={styles.list_plan_hours}> {("0"+(item._timeSpent/10)%60).slice(-2)}</Text>
            </View>
        </View>
    </View>
  );

  useEffect(() => {
    check_all_plans();
    let interval = null;
    if(timeOn){
      if(plan_title == ''){
        set_TimeOn(false);
        Alert.alert('DOOK', 'Please fill the discription of task you are going to perform !!')
        return ;
      }
      createInitalStart();
      interval = setInterval(()=>{
        setTime(prevTime=>prevTime + 10)
      },10)
    }else{
      if(plan_title != ''){
        clearInterval(interval);
        createTimeEnd();
      }
    }
    return ()=> clearInterval(interval);
  }, [timeOn]);
  return(
    <View style={styles.main_section}>
        <View style={styles.header_section}>
            <TextInput
              style={styles.input}
              onChangeText={onchange_plan_title}
              value={plan_title}
              placeholder="What are you doing ?"
              //keyboardType="numeric"
            />
            {/* <Text style={styles.header_info}> What are you doing ?</Text> */}
            <View style={styles.timeInfo}>
              <Text style={styles.header_info_time}> {("0"+Math.floor((time/60000)%60)).slice(-2)}:</Text>
              <Text style={styles.header_info_time}> {("0"+Math.floor((time/1000)%60)).slice(-2)}:</Text>
              <Text style={styles.header_info_time}> {("0"+(time/10)%60).slice(-2)}</Text>
            </View>
            {
              !timeOn?(
                <TouchableOpacity style={styles.control_button_start} onPress={() => set_TimeOn(true)}>
                  <Text style={styles.control_text}>Start</Text>
              </TouchableOpacity>
              ):(
                <TouchableOpacity style={styles.control_button_stop} onPress={() => set_TimeOn(false)}>
                    <Text style={styles.control_text}>Stop</Text>
                </TouchableOpacity>
              )
            }
            
        </View>
        <View style={styles.plans_main_section}>
              <FlatList
                  style={{width:'100%'}}
                  data={all_plans}
                  renderItem={renderItem}
                  keyExtractor={item => item._startTime}
                  ListHeaderComponent={<View style={styles.HeaderStyle}></View>}
                  ListFooterComponent={<View style={styles.footerStyle}></View>}
              />
        </View>
    </View>
  )
}



const styles = StyleSheet.create({
  main_section:{
    flex:1,
    width:'100%',
    backgroundColor:'#e6e6e5',
    // paddingBottom:80,
  },
  header_section:{
    backgroundColor:'#ffffff',
    width:'100%',
    height:80,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,

    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10,
  },
  input: {
    height: 55,
    // margin: 12,
    borderWidth: 1,
    borderColor:'#e6e6e5',
    borderRadius:10,
    paddingHorizontal: 10,
    fontSize:16,
    width:'48%',
  },
  header_info:{
    fontSize:18,
  },

  timeInfo:{
    flexDirection:'row',
  },  
  header_info_time:{
    fontSize:18,
  },
  control_button_start:{
    backgroundColor:'#35830a',
    paddingHorizontal:26,
    paddingVertical:10,
    borderRadius:20,
  },

  control_button_pause:{
    backgroundColor:'#c7c738',
    paddingHorizontal:26,
    paddingVertical:10,
    borderRadius:20,
  },

  control_button_stop:{
    backgroundColor:'#8b0625',
    paddingHorizontal:26,
    paddingVertical:10,
    borderRadius:20,
  },
  control_text:{
    color:'white',
    fontSize:16,
  },
  plans_main_section:{
    alignItems:'center',
    marginBottom:'10%',
    //backgroundColor:'red',
    // paddingBottom:50,
  },
  plans:{
    marginTop:'0%',
    width:'95%',
    // backgroundColor:'#ffffff',
    // borderRadius:10,
  },
  plan_header:{
    paddingHorizontal:15,
    paddingTop:8,paddingBottom:14,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#ffffff',
    // borderTopLeftRadius:10,
    // borderTopRightRadius:10,
    marginTop:10,
  },
  plan_header_title:{
    fontWeight:'900',
    fontSize:17,
  },
  plan_header_total_hours:{
    fontWeight:'900',
    fontSize:17,
  },
  list_plan:{
    paddingHorizontal:15,
    paddingVertical:16,
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor:'#e5e5e8',
    borderBottomWidth:1,
    backgroundColor:'#ffffff',
  },
  time_spent_display:{
    flexDirection:'row',
  },
  list_plan_title:{
    fontWeight:'bold',
    fontSize:16,
  },
  list_plan_description:{
    fontSize:12,
    marginLeft:1,

  },
  list_plan_hours:{
    fontSize:18,
  },
  HeaderStyle:{
    height:10,
  },
  footerStyle:{
    // backgroundColor:'red',
    height:50,
    // width:200,
  }
});
