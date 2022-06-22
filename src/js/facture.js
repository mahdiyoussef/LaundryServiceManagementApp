import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
export default function Facture({navigation}) {
    const [comdata,setcomdata]=useState()
    const [dataitems,setdataitems]=useState(null)
    const [bon,setbon]=useState(null)
    const [load,setload]=useState(true) 
    const [datapr,setdatapr]=useState()
    const tva=0.2;
    useEffect(()=>{
        firebase.database().ref('/'+navigation.getParam('pr')+'/info').on('value',snapshot=>{
            setdatapr(snapshot.val())
        })
        firebase.database().ref('/'+navigation.getParam('pr')+'/entr/'+navigation.getParam('nentr')).on('value',snapshot=>{
            setcomdata(snapshot.val())
        })
        firebase.database().ref('/'+navigation.getParam('pr')+'/entr/'+navigation.getParam('nentr')+'/bon/'+1+'/items').on('value',snapshot=>{
            setdataitems(snapshot.val())
        })
        firebase.database().ref('/'+navigation.getParam('pr')+'/entr/'+navigation.getParam('nentr')+'/bon/'+navigation.getParam('nbn')).on('value',snapshot=>{
            setbon(snapshot.val())
            setload(false)
        })
    },[load])
    return(<View>
        <Text style={{fontFamily:'Taj-bold',color:'#2B4F60',marginTop:60,fontSize:25,textAlign:'center'}}>مصبنتي</Text>
        <View>
           <Text style={{fontFamily:'Taj-regular',marginRight:10}}>رقم الفاتورة :{bon?.n}</Text>
           <Text style={{fontFamily:'Taj-regular',marginRight:10}}>{datapr?.name}</Text>
           <Text style={{fontFamily:'Taj-regular',marginRight:10}}>{datapr?.adress}</Text>
           <Text style={{fontFamily:'Taj-regular',marginRight:10,textAlign:'right'}}>{datapr?.tel}</Text> 
        </View>
        <View style={{width:150}}>
            <Text style={{fontFamily:'Taj-regular',marginRight:10,textAlign:'right'}}>{comdata?.namecom}</Text>
            <Text style={{fontFamily:'Taj-regular',marginRight:10,textAlign:'right'}}>{comdata?.tel}</Text>
        </View>
        <View style={{width:'100%',marginTop:10,minHeight:300}}>
                    <View style={{alignItems:'center',flexDirection:'row',borderWidth:1,}}>
                        <Text style={{fontFamily:'Taj-bold',textAlign:'center',width:'20%',borderRightWidth:1}}>{'الثمن'}</Text>
                        <Text style={{fontFamily:'Taj-bold',textAlign:'center',width:'35%',borderRightWidth:1}}>{'الخدمات'}</Text>
                        <Text style={{fontFamily:'Taj-bold',textAlign:'center',width:'25%',borderRightWidth:1}}>{'السلعة'}</Text>
                        <Text style={{fontFamily:'Taj-bold',textAlign:'center',width:'20%',borderRightWidth:1}}>{'الكمية'}</Text>
                    </View>
                {
                    dataitems?.map((i)=>{
                        return(<View style={{alignItems:'center',flexDirection:'row',borderWidth:1}}>
                        <Text style={{fontFamily:'Taj-regular',textAlign:'center',width:'20%',borderRightWidth:1}}>{i.prix}</Text>
                        <Text style={{fontFamily:'Taj-regular',textAlign:'center',width:'35%',borderRightWidth:1}}>{i.services}</Text>
                        <Text style={{fontFamily:'Taj-regular',textAlign:'center',width:'25%',borderRightWidth:1}}>{i.items}</Text>
                        <Text style={{fontFamily:'Taj-regular',textAlign:'center',width:'20%',borderRightWidth:1}}>{i.quantite}</Text>
                    </View>)
                    })
                }
        </View>
        <View>
            <Text style={{fontFamily:'Taj-bold',marginRight:10}}>المجموع الجزئي:{bon?.total}</Text>
            <Text style={{fontFamily:'Taj-bold',marginRight:10}}>الضريبة على القيمة المضافة:{bon?.total*navigation.getParam('tva')}</Text>
            <Text style={{fontFamily:'Taj-bold',marginRight:10}}>الاجمالي:{bon?.total+bon?.total*navigation.getParam('tva')+'درهم'}</Text>
        </View> 
        <View style={{width:150,marginTop:20}}>
            <Text style={{fontFamily:'Taj-bold',marginRight:10,fontSize:18}}>التوقيع</Text>
        </View>       
    </View>
    )
}