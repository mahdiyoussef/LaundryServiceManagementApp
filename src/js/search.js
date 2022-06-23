import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
export default function search({navigation}) {
    const pr=navigation.getParam('pr')
    const [databons,setdatabons]=useState(null)
    const [laoddata,setloaddata]=useState(true)
    useEffect(()=>{
        firebase.database().ref('/pressingMogador/bon').on('value',snapshot=>{
            setdatabons(snapshot.val())
            setloaddata(false)
        })
    },[laoddata])
    const [nbon,setnbon]=useState()
    const [open,openOptionMenu]=useState(false)
    const updateStatus=()=>{
        firebase.database().ref('/pressingMogador/bon/'+nbon).update({
            status:'تم استلامه من طرف الزبون',
            pay:true
        })
    }
    const [ng,setng]=useState(1)
    const switchtypes=()=>{
        if(ng==1){
            settypedb('n')
            setypear('رقم البون')
            setng(ng+1)
        }
        else if(ng%2==1){
            settypedb('n')
            setypear('رقم البون')
            setng(ng+1)
        }
        else{
            settypedb('tel')
            setypear('رقم الهاتف')
            setng(ng+1)
        }
    }
    const optionsMenu=()=>{
        if(open){
            return(<View style={styles.optionMenuCont}>
                
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
    const [typear,setypear]=useState('رقم الهاتف')
    const [typedb,settypedb]=useState('tel')
    const [opens,setopenpopups]=useState(false)
    const [search,setsearch]=useState(false)
    const searchprocess=()=>{
        if(!search){
            return(
                <View>
                    <ScrollView style={{height:'95%'}}>
                    {
                    databons?.map((i)=>{
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
                        )
                    })
                }
                        <View style={{height:40}}>

                        </View>
                    </ScrollView>
                </View>
            )
        }
        else{
            return(
            <View>
                <ScrollView>
                    {
                    databons?.map((i)=>{
                        if(inputsearch==i[typedb]){
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
                                </View>
                                
                            </View>
                        )}
                    })
                }
                    <View style={{height:40}}>

                    </View>
                    </ScrollView>
            </View>)
        }
    }
    const typepopup=()=>{
        if(opens){
            return(<View style={styles.typepopup}>
                <TouchableOpacity style={{alignItems:'center',marginTop:5}} onPress={
                    ()=>{
                        settypedb('tel')
                        setypear('رقم الهاتف')
                    }
                }>
                    <Text style={{fontFamily:'Taj-bold',color:'white'}}>رقم الهاتف</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center',marginTop:5}}  onPress={
                    ()=>{
                        settypedb('n')
                        setypear('رقم البون')
                    }
                }>
                    <Text style={{fontFamily:'Taj-bold',color:'white'}}>رقم البون</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    setopenpopups(false)
                }} style={{alignItems:'center',marginTop:5}}>
                    <Text style={{fontFamily:'Taj-bold',color:'white'}}>اغلاق</Text>
                </TouchableOpacity>
            </View>)
        }
        else{
            return(
            <View>

            </View>)
        }
    }
    const [inputsearch,setis]=useState('')
    return(
    <View style={styles.container}>
        {typepopup()}
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{width:'24%'}} onPress={()=>{
                if(inputsearch==""){

                }
                else{
                    setsearch(true)
                }
            }}>
                <View style={styles.searchbtn}>
                    <Text style={{fontFamily:'Taj-bold',color:'white'}}>البحث</Text> 
                    <Image source={require('../icons/icons8-search-30.png')} tintColor="white" />
                     
                </View>
            </TouchableOpacity>
            <TextInput style={styles.input} placeholderTextColor={'#182C61'} placeholder={"اكتب"+" "+typear} value={inputsearch} onChangeText={(text)=>{
                setis(text)
            }}/>
            <TouchableOpacity style={{width:'18%'}} onPress={()=>{
                switchtypes()
            }}>
                <View style={styles.btnOption}>
                    <Image source={require('../icons/swap32.png')} tintColor={'white'} />
                </View>
            </TouchableOpacity>
        </View>
        {optionsMenu()}
        {searchprocess()}
    </View>)
}
const styles=StyleSheet.create({
    container:{
        paddingTop:50,
        height:'100%',
        width:'100%',
        backgroundColor:'white'
    },
    input:{
        borderRadius:10,
        borderWidth:3,
        borderColor:'#182C61',
        marginLeft:10,
        marginRight:10,
        textAlign:'center',
        fontFamily:'Taj-bold',
        fontSize:16,
        width:'50%',
        height:50
    },
    searchbtn:{
        borderRadius:10,
        backgroundColor:'#182C61',
        height:50,
        textAlignVertical:'center',
        alignItems:'center',
        // padding:10,
        marginLeft:10,
        flexDirection:'row'
        ,paddingLeft:10
    },
    btnOption:{
        borderRadius:10,
        backgroundColor:'#182C61',
        height:50,
        textAlignVertical:'center',
        alignItems:'center',
        // padding:10,
        paddingLeft:10 
        ,paddingTop:8
    },
    typepopup:{
        position:'absolute',
        top:205,
        left:305,
        righ:2,
        backgroundColor:'#182C61',
        width:80,
        height:100,
        borderRadius:10
    },bmenu:{
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
        top:'5%',
        left:'10%',
        right:'10%',
        bottom:'90%',
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
        padding:5,
        marginLeft:30,
        marginRight:30,
        marginTop:3
    }
})