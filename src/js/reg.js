import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
export default function Reg({navigation}) {
    const added=()=>{
        if(sended){
            return(<View><Text style={{
                fontFamily:'Taj-bold',marginTop:20,textAlign:'center',fontSize:16
            }}>تم ارسال طلبك بنجاح</Text></View>)
        }
        else{
            return(<View></View>)
        }
    }
    const [prob,setprob]=useState(false)
    const promess=()=>{
        if(prob){
            return(<View><Text style={{
                fontFamily:'Taj-bold',marginTop:20,textAlign:'center',fontSize:16
            }}>المعلومات غير مكتملة</Text></View>)
        }
        else{
            return(<View></View>)
        }
    }
    const [sended,setsended]=useState(false)
    const [load,setload]=useState(true)
    useEffect(()=>{
        firebase.database().ref('/reg').on('value',snapshot=>{
            if(snapshot.exists){
                setdatareg(snapshot.val())
                setload(false)
            }
            else{
                setdatareg([1])
                setload(false)
            }
        })
    },[load])
    const [datareg,setdatareg]=useState()
    const [name,setname]=useState('')
    const [adr,setadr]=useState('')
    const [ntel,setntel]=useState('')
    const addreg=()=>{
        if(name=='' || adr=='' || ntel==''){
            setprob(true)
            setsended(false)
        }
        else{
            firebase.database().ref('/reg/'+datareg?.length).set({
                name:name,
                tel:ntel,
                adress:adr
            })
            setprob(false)
            setsended(true)
            setname('')
            setadr('')
            setntel('')
        }
    }
    return(<View style={styles.container}>
        <Text style={styles.wlc}>مرحبا بك</Text>
        <Text style={styles.title}>استمارة التسجيل في تطبيق مصبنتي</Text>
        <TextInput placeholderTextColor={'#273c75'} style={styles.input} placeholder="الاسم المصبنة باللغة العربية" value={name} onChangeText={(text)=>setname(text)} />
        <TextInput value={adr} onChangeText={(text)=>setadr(text)} placeholderTextColor={'#273c75'} style={styles.input} placeholder="العنوان" />
        <TextInput value={ntel} onChangeText={(text)=>setntel(text)} placeholderTextColor={'#273c75'} style={styles.input} placeholder="رقم الهاتف" />
        <TouchableOpacity onPress={()=>addreg()}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>ارسال</Text>
            </View>
        </TouchableOpacity>
        {added()}
        {promess()}
    </View>)
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    wlc:{
        fontFamily:'Taj-regular',
        fontSize:20,
        marginTop:50,
        textAlign:'center'
    },
    title:{
        textAlign:'center',
        fontFamily:'Taj-bold',
        fontSize:16,
        marginBottom:20
    },
    input:{
        fontFamily:'Taj-bold',
        textAlign:'center',
        marginTop:10,
        borderRadius:10,
        padding:10,
        borderWidth:6,
        borderColor:'#273c75',
        marginLeft:20,
        marginRight:20
    },
    btn:{
        marginTop:10,
        borderRadius:10,
        padding:16,
        borderColor:'#273c75',
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#273c75',
        alignItems:'center'
    },
    btnText:{
        fontFamily:'Taj-bold',
        color:'white'
    }
})