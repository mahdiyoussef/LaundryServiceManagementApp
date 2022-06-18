import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
export default function Company({navigation}) {
    const [nameCom,setnameCom]=useState('')
    const [ntel,setntel]=useState('')
    const [dataentr,setdataentr]=useState(null)
    const [load,setload]=useState(true)
    useEffect(()=>{
        firebase.database().ref('/pressingMogador/entr/').on('value',snapshot=>{
            if(snapshot.exists()){
                setdataentr(snapshot.val())
            }
            else{
                setdataentr([1])
            }
        })
        setload(false)
    },[load])
    const addentr=()=>{
        if(nameCom=='' && ntel==""){
            
        }
        else{
            firebase.database().ref('/pressingMogador/entr/'+dataentr?.length).set({
                n:dataentr?.length,
                namecom:nameCom,
                tel:ntel
            })
            setnameCom('')
            setntel('')
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.titletext}>اضافة مقاولة</Text>
            <TextInput style={styles.input} placeholderTextColor={'#192a56'} placeholder={'اسم المقاولة'} value={nameCom} onChangeText={(text)=>{
                setnameCom(text)
            }}/>
            <TextInput style={styles.input} placeholderTextColor={'#192a56'} placeholder='رقم الهاتف' value={ntel} onChangeText={(text)=>setntel(text)} />
            <TouchableOpacity onPress={()=>addentr()}>
                <View style={styles.btnadd}>
                    <Text style={{
                        textAlign:'center',
                        fontFamily:'Taj-bold',
                        fontSize:16,
                        color:'white'
                    }}>اضافة</Text>
                </View>
            </TouchableOpacity>
            <Text style={{
                marginTop:10,
                fontFamily:'Taj-regular',
                fontSize:16,
                color:'#192a56',
                textAlign:'center'
            }}>لائحة المقاولات</Text>
            <ScrollView style={{
                height:'50%',
                width:'100%',
                backgroundColor:'white',
                borderTopLeftRadius:20,
                borderTopRightRadius:20
            }}>
                {
                    dataentr?.map((e)=>{
                        
                        return(<View style={{
                            borderWidth:4,
                            borderRadius:20,
                            borderColor:'#192a56',
                            marginTop:10,
                            padding:10,
                            marginLeft:20,
                            marginRight:20,
                            flexDirection:'row'
                        }}>
                            <View style={{
                                width:'40%'
                                ,marginTop:15
                            }}>
                                <TouchableOpacity onPress={()=>{
                                    Linking.openURL(`tel:${e.tel}`)
                                }}>
                                <Image source={require('../icons/icons8-call-30.png')} />
                                </TouchableOpacity>
                            </View>
                           <View style={{width:'60%'}}>
                                <Text style={styles.textinfo}>{e.n}</Text>
                                <Text style={styles.textinfo}>الاسم :{e.namecom}</Text>
                                <Text style={styles.textinfo}>رقم الهاتف :{e.tel}</Text>
                            </View> 
                        </View>)
                    })
                }
            </ScrollView>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
    textinfo:{
        textAlign:'right',
        fontFamily:'Taj-regular'
        ,color:'#192a56',
        fontSize:16,

    },
    titletext:{
        marginTop:60,
        fontFamily:'Taj-bold',
        fontSize:20,
        textAlign:'center'
    },
    input:{
        textAlign:'center',
        fontFamily:'Taj-regular',
        fontSize:16,
        borderColor:'#192a56',
        borderRadius:20,
        borderWidth:4,
        padding:5,
        marginTop:10,
        marginLeft:20,
        marginRight:20
    },
    btnadd:{
        borderColor:'#192a56',
        borderRadius:20,
        borderWidth:4,
        padding:5,
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#192a56'
    }
})