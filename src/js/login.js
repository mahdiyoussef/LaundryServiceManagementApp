import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
export default function login({navigation}) {
    // useEffect(()=>{
    //     firebase.database().ref('login/pressingMogador').on('value',snapshot=>{
    //         setdata(snapshot.val())
    //         // setload(false)
    //     })
    // },[load])
    const login=()=>{
        firebase.database().ref('/login/'+user).on('value',snapshot=>{
            if(snapshot.exists()){
                console.log('snap exist')
                if(pwd==snapshot.val()?.pwd){
                    navigation.navigate('dashb',{pr:user})
                }
                else{
                    seterr(true)
                }
            }
            else{
                console.log('snapshot non exs')
                seterr(false)
            }
        })
    }
    const [err,seterr]=useState(false)
    const infop=()=>{
        if(err){
            return(<View style={styles.errcc}><Text style={styles.textinfonotcorrect}>المعلومات غير صحيحة</Text></View>)
        }
        else{
            return(<View></View>)
        }
    }
    const [user,setuser]=useState()
    const [pwd,setpwd]=useState()
    const [load,setload]=useState(true)
    const [data,setdata]=useState()
    return(<View style={styles.container}>
        <Text style={styles.textTitle}>مصبنتي</Text>
        {/* {
            data?.map((i)=>{
                return(<View><Text>{i.to}</Text></View>)
            })
        } */}
        <View style={styles.container_inputs}>
            <TextInput style={styles.input} value={user} onChangeText={(text)=>setuser(text)} placeholder="اسم المستخدم" placeholderTextColor={'black'} />
            <TextInput style={styles.input} value={pwd} onChangeText={(text)=>setpwd(text)} placeholder="كلمة المرور" placeholderTextColor={'black'} secureTextEntry={true}/>
            <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={login}>
                <View style={styles.btnlog}>
                    <Text style={styles.textbtnlog}>الدخول الى الحساب</Text>
                </View>
            </TouchableOpacity>
            {infop()}
            <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={()=>navigation.navigate('regp')}>
                <View style={styles.btnlog}>
                    <Text style={styles.textbtnlog}>التسجيل</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>)
}
const styles=StyleSheet.create({
    textTitle:{
        fontFamily:'Taj-bold',
        marginTop:'45%',
        textAlign:'center',
        fontSize:60,
        color:'#30336b'
    },
    input:{
        width:'80%',
        borderRadius:8,
        borderWidth:4,
        borderColor:'#30336b',
        marginTop:20,
        padding:10,
        textAlign:'center',
        fontFamily:'Taj-regular'
    },
    container_inputs:{
        alignItems:'center'
    },
    container:{
        // backgroundColor:'#f6e58d',
        width:'100%',
        height:'100%'
    },
    btnlog:{
        marginTop:10,
        width:'80%',
        borderRadius:8,
        borderWidth:4,
        borderColor:'#30336b',
        backgroundColor:'#30336b',
        padding:10
    },
    textbtnlog:{
        textAlign:'center',
        color:'white',
        fontFamily:'Taj-bold',
    },
    errcc:{
        textAlign:'center',
        marginTop:10
        
    },
    textinfonotcorrect:{
        fontFamily:'Taj-bold'
    }
})