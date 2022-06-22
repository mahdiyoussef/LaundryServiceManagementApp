import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
import bmenu from '../icons/bmenu.svg';
export default function menu({navigation}) {
    const pr=navigation.getParam('pr')
    const [load,setload]=useState(true)
    const [infop,setinfop]=useState()
    useEffect(()=>{
        firebase.database().ref(pr+'/info').on('value',snapshot=>{
            setinfop(snapshot.val())
            setload(false)
        })
    },[load])
    const logoutf=()=>{
        if(log){
            return(<View style={{
                position:'absolute',
                bottom:0,
                height:300,
                left:0,
                right:0,
                backgroundColor:'white',
                borderTopLeftRadius:40,
                borderTopRightRadius:40,
                shadowColor: "#000",
                shadowOffset: {
                    width: 4,
                    height: 5,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
        
                elevation: 7,
                backgroundColor:'#ffffff'
            }}>
                <Text style={{
                    fontSize:30,textAlign:'center'
                }}>_</Text>
                <Text style={{
                    fontFamily:'Taj-bold',textAlign:'center',marginTop:10
                }}>هل تريد تسجيل الخروج</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('loginapp')}>
                   <View style={{
                    borderRadius:10,backgroundColor:'#273c75',padding:10,marginLeft:20,marginRight:20,alignItems:'center',marginTop:10
                   }}>
                        <Text style={{
                            color:'white',fontSize:18,fontFamily:'Taj-bold'
                        }}>نعم</Text>
                    </View> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setlog(false)}>
                   <View style={{
                    borderRadius:10,backgroundColor:'#e84118',padding:10,marginLeft:20,marginRight:20,alignItems:'center',marginTop:10
                   }}>
                        <Text style={{
                            color:'white',fontSize:18,fontFamily:'Taj-bold'
                        }}>لا</Text>
                    </View> 
                </TouchableOpacity>
            </View>)
        }
        else{
            return(<View></View>)
        }
    }
    const [log,setlog]=useState(false)
    return(<View style={styles.container}>
        {/* <TouchableOpacity onPress={()=>{
            navigation.navigate('dashb',{pr:pr})
        }}>
            <View style={styles.bmenu}>
                    <Image source={require('../icons/3394877631553239370-64.png')} style={{width:40,height:40}}/>
                    <Text style={styles.menutext}>اغلاق</Text>
            </View>
        </TouchableOpacity> */}
        {/* 2495438061548336236-64.png */}
        <View style={{
            alignItems:'center',marginTop:40
        }}>
            <View style={{flexDirection:'row'}}>
                <View>
                    <Text style={styles.textinfo}>{infop?.name}</Text>
                    <Text style={styles.textinfo}>{infop?.adress}</Text>
                    <Text style={styles.textinfo}>{infop?.tel}</Text>
                </View>
                <View>
                    <Image source={require('../icons/shop.png')} />
                </View>
            </View>
            
        </View>
        <View style={{alignItems:'flex-end',marginRight:20,marginTop:10}}>
            <TouchableOpacity onPress={()=>navigation.navigate('dashb',{pr:pr})}>
            <View style={{flexDirection:'row',marginTop:10,alignItems:'flex-end'}}>
                <Text style={styles.navtext}> لوحة القيادة</Text>
                <Image source={require('../icons/icons8-dashboard-64.png')} style={{width:32,height:32}} />
            </View></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('searchin',{pr:pr})}>
            <View style={{flexDirection:'row',marginTop:10,alignItems:'flex-end'}}>
                <Text style={styles.navtext}>البحث</Text>
                <Image source={require('../icons/icons8-search-60.png')} style={{width:32,height:32}} />
            </View></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('companypg',{pr:pr})}>
            <View style={{flexDirection:'row',marginTop:10,alignItems:'flex-end'}}>
                <Text style={styles.navtext}>صفحة المقاولات</Text>
                <Image source={require('../icons/icons8-company-60.png')} style={{width:32,height:32}} />
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('settingp',{pr:pr})}>
            <View style={{flexDirection:'row',marginTop:10,alignItems:'flex-end'}}>
                <Text style={styles.navtext}>الاعدادات</Text>
                <Image source={require('../icons/icons8-setting-48.png')} style={{width:32,height:32}} />
            </View></TouchableOpacity>
            {/* icons8-logout-60.png */}
            <TouchableOpacity onPress={()=>setlog(true)}>
            <View style={{flexDirection:'row',marginTop:10,alignItems:'flex-end'}}>
                <Text style={styles.navtext}>تسجيل الخروج</Text>
                <Image source={require('../icons/icons8-logout-60.png')} style={{width:32,height:32}} />
            </View></TouchableOpacity>
        </View>
        {logoutf()}
    </View>)
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
       
    },
    bmenu:{
        marginTop:50,
        width:80,
        marginLeft:20,
        borderRadius:4,
        borderWidth:2,
        borderColor:'black',
        alignItems:'center'
    },
    menutext:{
        fontFamily:'Taj-bold',
        textAlign:'center'
    },
    textinfo:{
        fontFamily:'Taj-bold',
        marginRight:20,
        textAlign:'right'
    },
    navtext:{
        textAlignVertical:'center',
        fontFamily:'Taj-bold',
        fontSize:18
    }
})