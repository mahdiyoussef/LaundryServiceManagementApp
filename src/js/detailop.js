import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import Facture from "./facture";
export default function detailOp({navigation}) {
    const [dataitems,setdataitems]=useState(null)
    const [bon,setbon]=useState(null)
    const [load,setload]=useState(true) 
    const nameP=()=>{
        return datapr?.name
    }
    const [tva,setTva]=useState()
    const [openfact,setopenfact]=useState(false)
    const factpopup=()=>{
        if(openfact){
            return(<View style={{position:'absolute',top:'30%',right:'5%',left:'5%',
            height:300,backgroundColor:'white',borderRadius:20,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
    
            elevation: 7,}}>
                <Text style={{textAlign:'center',fontFamily:'Taj-bold',marginTop:20,
                fontSize:20
            }}>قيمة TVA</Text>
            <TextInput value={tva} onChangeText={(text)=>setTva(text)} placeholderTextColor={'#130f40'} placeholder='قيمة TVA%' keyboardType="numeric" style={{
                borderRadius:10,borderWidth:4,borderColor:'#130f40',marginLeft:20,marginRight:20,
                padding:5,color:'#130f40',fontFamily:'Taj-regular',fontSize:16,textAlign:'center',
                marginTop:20
            }} />
            <TouchableOpacity  onPress={()=>{
                navigation.navigate('fact',{pr:navigation.getParam('pr'),nentr:navigation.getParam('nc'),nbn:navigation.getParam('nb'),tva:parseFloat(tva)*0.01})
                setopenfact(false)
            }}>
                <View style={{
                    borderRadius:10,borderWidth:4,borderColor:'#130f40',marginLeft:20,marginRight:20,
                    padding:5,backgroundColor:'#130f40',marginTop:20
                }}>
                   <Text style={{
                        fontFamily:'Taj-bold',fontSize:16,textAlign:'center',color:'white'
                   }}>صفحة الفاتورة</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{
                setopenfact(false)
            }}>
                <View style={{
                    borderRadius:10,borderWidth:4,borderColor:'#130f40',marginLeft:20,marginRight:20,
                    padding:5,backgroundColor:'#130f40',marginTop:20
                }}>
                   <Text style={{
                        fontFamily:'Taj-bold',fontSize:16,textAlign:'center',color:'white'
                   }}>اغلاق</Text> 
                </View>
            </TouchableOpacity>
            </View>)
        }
        else{
            return(<View>

            </View>)
        }
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var html=`<View/View>`
         const print = async () => {
            await Print.printAsync({
              html,
              printerUrl: selectedPrinter?.url, // iOS only
            });
          }
        
          const printToFile = async () => {
            // On iOS/android prints the given html. On web prints the HTML from the current page.
            const { uri } = await Print.printToFileAsync({
              html
            });
            console.log('File has been saved to:', uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
          }
        
          const selectPrinter = async () => {
            const printer = await Print.selectPrinterAsync(); // iOS only
            setSelectedPrinter(printer);
          }
    
    const totalitemsp=(array)=>{
        var n=0;
        array?.map((it)=>{
            n=n+it.prix;
        })
        return n;
    }
    const [name,setname]=useState(datapr?.name)
    useEffect(()=>{
        firebase.database().ref(navigation.getParam('pr')+'/info').on('value',snapshot=>{
            setdatapr(snapshot.val())
        })
        firebase.database().ref(navigation.getParam('pr')+'/entr/'+navigation.getParam('nc')).on('value',snapshot=>{
            setcomdata(snapshot.val())
        })
        firebase.database().ref(navigation.getParam('pr')+'/entr/'+navigation.getParam('nc')+'/bon/'+navigation.getParam('nb')+'/items').on('value',snapshot=>{
            setdataitems(snapshot.val())
        })
        firebase.database().ref(navigation.getParam('pr')+'/entr/'+navigation.getParam('nc')+'/bon/'+navigation.getParam('nb')).on('value',snapshot=>{
            setbon(snapshot.val())
            setload(false)
        })
    },[load])
    const [comdata,setcomdata]=useState()
    const [datapr,setdatapr]=useState()
    return(<View style={styles.container}>
       <View style={styles.titleContainer}><Text style={styles.titleText}>تفاصيل</Text></View> 
       <View>
            <Text style={styles.textinfobon}> رقم البون :{navigation.getParam('nb')}</Text>
            <Text style={styles.textinfobon}>الاجمالي:{totalitemsp(dataitems)}</Text>
            {/* <Text>{datapr?.name}</Text> */}
       </View>
            <View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                        <Text style={styles.showptext}>الثمن</Text>
                        <Text style={styles.showptext}>الخدمات</Text>
                        <Text style={styles.showptext}>السلعة</Text>
                        <Text style={styles.showptext}>الكمية</Text>
                    </View>
            <ScrollView style={{height:'75%'}}>
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
       <TouchableOpacity  onPress={()=>{
           setopenfact(true)
       }}>
            <View style={styles.btnsendsms}>
                <Text style={styles.btnsendtext}>الفاتورة</Text>
            </View>
       </TouchableOpacity>
       {factpopup()}
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