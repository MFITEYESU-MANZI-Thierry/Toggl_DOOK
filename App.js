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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Planning(){
  const [all_plans, set_all_plans] = React.useState([]);
  const [plan_title, onchange_plan_title] = React.useState("");
  const [time, setTime] = React.useState(0);
  const [timeOn, set_TimeOn] = React.useState(false);
  const check_all_plans = async() =>{
    const asyncData = await AsyncStorage.getItem('@all_plans');
    if(asyncData != null && asyncData != 'null'){
      let data = JSON.parse(asyncData);
      set_all_plans(data);
      console.log(data);
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
    let all_plans_data = all_plans;
    let time = {
      startTime:Date.now(),
      timeSpent:null,
      endTime:null,
    };
    all_plans_data.push(time);
    AsyncStorage.setItem('@all_plans', JSON.stringify(all_plans_data));
  }
  const createTimeEnd = () =>{
    if(all_plans.length > 0){

      let data = all_plans[all_plans.length - 1];
      let updated_data = {
        startTime:data.startTime,
        timeSpent:0,
        endTime:data.endTime,
      }
      // let data = all_plans[all_plans.length -1];
      console.log(updated_data);
    }
  }
  useEffect(() => {
    check_all_plans();
    let interval = null;
    if(timeOn){
      createInitalStart();
      interval = setInterval(()=>{
        setTime(prevTime=>prevTime + 10)
      },10)
    }else{
      clearInterval(interval);
      setTime(0);
      createTimeEnd();

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
          <ScrollView>
              <View style={styles.plans_main_section}>
                <View style={styles.plans}>
                    <View style={styles.plan_header}>
                        <Text style={styles.plan_header_title}>Today</Text>
                        <Text style={styles.plan_header_total_hours}>8 h 15 min</Text>
                    </View>
                    <View style={styles.list_plan}>
                        <View>
                            <Text style={styles.list_plan_title}>Evaluation</Text>
                            <Text style={styles.list_plan_description}>▪️ UX Review </Text>
                        </View>

                        <View>
                            <Text style={styles.list_plan_hours}>1:00:00</Text>
                        </View>
                    </View>
                    <View style={styles.list_plan}>
                        <View>
                            <Text style={styles.list_plan_title}>Evaluation</Text>
                            <Text style={styles.list_plan_description}>▪️ UX Review </Text>
                        </View>

                        <View>
                            <Text style={styles.list_plan_hours}>1:00:00</Text>
                        </View>
                    </View>
                    <View style={styles.list_plan}>
                        <View>
                            <Text style={styles.list_plan_title}>Evaluation</Text>
                            <Text style={styles.list_plan_description}>▪️ UX Review </Text>
                        </View>

                        <View>
                            <Text style={styles.list_plan_hours}>1:00:00</Text>
                        </View>
                    </View>
                </View>


              </View>
          </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  main_section:{
    flex:1,
    width:'100%',
    backgroundColor:'#e6e6e5',
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
    height: 40,
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
  },
  plans:{
    marginTop:'4%',
    width:'95%',
    backgroundColor:'#ffffff',
    borderRadius:10,
  },
  plan_header:{
    paddingHorizontal:15,
    paddingTop:8,paddingBottom:12,
    flexDirection:'row',
    justifyContent:'space-between',
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
  },
  list_plan_title:{
    fontWeight:'bold',
    fontSize:16,
  },
  list_plan_description:{
    fontSize:16,
  },
  list_plan_hours:{
    fontSize:18,
  },
});
