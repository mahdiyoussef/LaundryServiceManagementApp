import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
export default function bondetail({navigation}) {
    const [dataitems,setdataitems]=useState(null)
    const [bon,setbon]=useState(null)
    const [load,setload]=useState(true)    
    const sendSms=()=>{
        Linking.openURL(`sms:number=${bon?.tel}?body=${'مصبنة موكادور ترحب بكم رقم طلبكم هو'+bon?.n}`)
    }
    const totalitemsp=(array)=>{
        var n=0;
        array?.map((it)=>{
            n=n+it.prix;
        })
        return n;
    }
    useEffect(()=>{
        firebase.database().ref('/pressingMogador/bon/'+navigation.getParam('n')+'/items').on('value',snapshot=>{
            setdataitems(snapshot.val())
        })
        firebase.database().ref('/pressingMogador/bon/'+navigation.getParam('n')).on('value',snapshot=>{
            setbon(snapshot.val())
            setload(false)
        })
    },[load])
    return(<View style={styles.container}>
       <View style={styles.titleContainer}><Text style={styles.titleText}>تفاصيل</Text></View> 
       <View>
            <Text style={styles.textinfobon}> رقم البون :{bon?.n}</Text>
            <Text style={styles.textinfobon}>الاجمالي:{totalitemsp(dataitems)}</Text>
            <Text style={styles.textinfobon}>رقم الهاتف:{bon?.tel}</Text>
       </View>
            <View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <Text style={styles.showptext}>الثمن</Text>
                        <Text style={styles.showptext}>الخدمات</Text>
                        <Text style={styles.showptext}>السلعة</Text>
                        <Text style={styles.showptext}>الكمية</Text>
                    </View>
            <ScrollView style={{height:'70%'}}>
                {
                    dataitems?.map((i)=>{
                        return(<View style={{alignItems:'center',flexDirection:'row',}}>
                        <Text style={styles.showptext1}>{i.prix}</Text>
                        <Text style={styles.showptext1}>{i.services}</Text>
                        <Text style={styles.showptext1}>{i.items}</Text>
                        <Text style={styles.showptext1}>{i.quantite}</Text>
                    </View>)
                    })
                }
            </ScrollView>
       </View>
       <TouchableOpacity onPress={()=>{
            sendSms()
       }}>
            <View style={styles.btnsendsms}>
                <Text style={styles.btnsendtext}>ارسال البون عبر SMS</Text>
            </View>
       </TouchableOpacity>
    </View>)
}
const styles=StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        backgroundColor:'white',
        paddingTop:60
    },
    titleContainer:{
        alignItems:'center'
    },
    titleText:{
        fontFamily:'Taj-bold',
        fontSize:25
    },
    textinfobon:{
        fontFamily:'Taj-regular',
        fontSize:20,
        marginRight:5
    },
    showptext:{
        width:'25%',
        textAlign:'center',
        fontFamily:'Taj-bold'
    },
    validate:{
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'#38ada9',
        padding:10,
        marginTop:20,
        marginLeft:10,
        marginRight:10
    },
    showptext1:{
        width:'25%',
        textAlign:'center',
        fontFamily:'Taj-regular',
        color:'black'
    },btnsendsms:{
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'#27ae60',
        padding:10,
        marginLeft:10,
        marginRight:10
    }
    ,btnsendtext:{
        fontFamily:'Taj-bold',
        color:'white'
    }
})