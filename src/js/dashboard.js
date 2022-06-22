import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
import bmenu from '../icons/bmenu.svg';
export default function Dashboard({navigation}) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const pr=navigation.getParam('pr')
    useEffect(()=>{
        firebase.database().ref(pr+'/bon').on('value',snapshot=>{
            setdataitems(snapshot.val())
        })
        setload(false)
    },[load])
    const [load,setload]=useState(true)
    const [dataitems,setdataitems]=useState()
    const [nbon,setnbon]=useState()
    const [open,openOptionMenu]=useState(false)
    const updateStatus=()=>{
        firebase.database().ref(pr+'/bon/'+nbon).update({
            status:'تم استلامه من طرف الزبون',
            pay:true
        })
    }
    const optionsMenu=()=>{
        if(open){
            return(<View style={styles.optionMenuCont}>
                <Text style={{fontFamily:'Taj-bold',padding:10,textAlign:'center',fontSize:20}}>تغيير حالة البون</Text>
                <TouchableOpacity onPress={()=>{
                    updateStatus()
                }}>
                    <View style={styles.btnchangeStatus}>
                        <Text style={{
                            fontFamily:'Taj-regular',fontSize:16,color:'white'
                        }}>تم استلامه من طرف الزبون</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    openOptionMenu(false)
                }}>
                    <View style={styles.btnchangeStatus}>
                        <Text style={{
                            fontFamily:'Taj-regular',fontSize:16,color:'white'
                        }}>اغلاق النافذة</Text>
                    </View>
                </TouchableOpacity>
            </View>)
        }
        else{
            return(<View></View>)
        }
    }
    const pay=(f)=>{
        if(f){
            return "نعم"
        }
        else{
            return "لا"
        }
    }
    return(
    <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('menup',{pr:pr})
            }}>
                <View style={styles.bmenu}>
                    <Image source={require('../icons/18293293931543238902-64.png')} style={{width:40,height:40}}/>
                    <Text style={styles.menutext}>القائمة</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.dshtitlew}>
                <Text style={{fontFamily:'Taj-regular',fontSize:16}}>مرحبا بك</Text>
                <Text style={{fontFamily:'Taj-bold',fontSize:20}}>مصبنة موكادور</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('addbonp',{pr:pr})}>
                <View style={styles.baddb}>
                    <Image source={require('../icons/2495438061548336236-64.png')} style={{width:40,height:40}}/>
                    <Text style={styles.menutext}>اضافة بون</Text>
                </View>
            </TouchableOpacity>
        </View>
        {/* 2495438061548336236-64.png */}
        <View>
            
            <Text style={{
                fontFamily:'Taj-regular',
                marginTop:10,
                textAlign:'center',
                fontSize:20
            }}>البونات اليوم</Text>
            <ScrollView style={{
                height:'69%',width:'100%',marginTop:10,
            }}>
                {
                    dataitems?.map((i)=>{
                        if(i.date==date){
                        return(
                            <View style={styles.itemboncont}>
                                <View style={{width:'20%'}}>
                                    <TouchableOpacity onPress={()=>{
                                        setnbon(i.n)
                                        openOptionMenu(true)
                                    }}>
                                        <Image source={require('../icons/icons8-option-32.png')}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{
                                        Linking.openURL(`tel:${i.tel}`)
                                    }}>
                                        <Image source={require('../icons/icons8-call-30.png')}/>
                                    </TouchableOpacity>
                                    {/* icons8-more-details-50.png */}
                                    <TouchableOpacity onPress={()=>{
                                        navigation.navigate('bondt',{n:i.n,pr:pr})
                                    }}>
                                        <Image source={require('../icons/icons8-more-details-32.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width:'80%',alignItems:'flex-end'}}>
                                <Text style={styles.textdata}>رقم:{i.n}</Text>
                                <Text style={styles.textdata}>التاريخ:{i.date}</Text>
                                <Text style={styles.textdata}>رقم الهاتف :{i.tel}</Text>
                                <Text style={styles.textdata}>الاجمالي :{i.total+'درهم'}</Text>
                                <Text style={styles.textdata}>الحالة:{i.status}</Text>
                                <Text style={styles.textdata}>مخلص:{pay(i.pay)}</Text>

                                </View>
                                
                            </View>
                        )}
                    })
                }
            </ScrollView>
        </View>
        <View style={{
            flexDirection:'row',borderTopColor:'#808e9b',borderTopWidth:2,padding:10,position:'absolute',
            bottom:0,height:100,left:0,right:0
        }}>
            <TouchableOpacity style={{width:'25%'}} onPress={()=>{
                navigation.navigate('dashb',{pr:pr})
            }}>
                <View style={styles.btnmnav}>
                    <Image source={require('../icons/icons8-dashboard-64.png')} tintColor={'#808e9b'} style={{width:40,height:40}}/>
                    <Text style={styles.textNav}>لوحة القيادة</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'25%'}} onPress={()=>{
                navigation.navigate('searchin',{pr:pr})
            }}>
                <View style={styles.btnmnav}>
                    <Image source={require('../icons/icons8-search-60.png')} tintColor={'#808e9b'} style={{width:40,height:40}}/>
                    <Text style={styles.textNav}>البحث</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'25%'}} onPress={()=>{
                navigation.navigate('companypg',{pr:pr})
            }}>
                <View style={styles.btnmnav}>
                    <Image tintColor={'#808e9b'} source={require('../icons/icons8-company-60.png')} style={{width:40,height:40}}/>
                    <Text style={styles.textNav}>صفحة المقاولات</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'25%'}} onPress={()=>{
                navigation.navigate('settingp',{pr:pr})
            }}>
                <View style={styles.btnmnav}>
                    <Image tintColor={'#808e9b'} source={require('../icons/icons8-setting-48.png')} style={{width:40,height:40}}/>
                    <Text style={styles.textNav}>الاعدادات</Text>
                </View>
            </TouchableOpacity>
        </View>
        {optionsMenu()}
    </View>)
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'white'
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
    baddb:{
        position:'relative',
        top:50,
        right:20,
        width:80,
        borderRadius:4,
        borderWidth:2,
        borderColor:'black',
        alignItems:'center',
        // marginLeft:'65%'
    },
    dshtitlew:{
        marginTop:60,
        width:'54%',
        alignItems:'center'
    },
    textdata:{
        fontFamily:'Taj-regular',
        marginRight:20
    },
    itemboncont:{
        marginTop:10,
        borderWidth:2,
        borderColor:'black',
        padding:10,
        marginLeft:10,
        marginRight:10,
        flexDirection:'row'
    },
    btnmnav:{
        
        alignItems:'center'
    },
    textNav:{
        textAlign:'center',
        fontFamily:'Taj-bold',
        color:'#808e9b'
    },
    optionMenuCont:{
        position:'absolute',
        top:'30%',
        left:'10%',
        right:'10%',
        bottom:'40%',
        backgroundColor:'white',
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    btnchangeStatus:{
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'#2bcbba',
        padding:10,
        marginLeft:10,
        marginRight:10,
        marginTop:20
    }
})