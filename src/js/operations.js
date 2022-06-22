import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import firebase from "firebase";
export default function operations({navigation}) {
    const [load,setload]=useState(true)
    const [databons,setdatabons]=useState()
    useEffect(()=>{
        firebase.database().ref(navigation.getParam('pr')+'/entr/'+navigation.getParam('nc')+'/bon/').on('value',snapshot=>{
            setdatabons(snapshot.val())
            setload(false)
        })
    },[load])
    return(<View style={{width:'100%',height:'100%'}}>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('addopp',{nc:navigation.getParam('nc'),np:navigation.getParam('pr')})
        }}>
            <View style={styles.btnaddbon}>
                <Image source={require('../icons/2495438061548336236-64.png')}/>
                <Text style={{
                    fontFamily:'Taj-bold'
                }}>اضافة بون</Text>
            </View>
        </TouchableOpacity>
        <Text style={{
            marginTop:150,textAlign:'center',fontFamily:'Taj-bold',fontSize:18
        }}>العمليات</Text>
        <ScrollView style={{height:'70%'}}>
        {
            databons?.map((b)=>{
                return(
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('detailop',{pr:navigation.getParam('pr'),nc:navigation.getParam('nc'),nb:b?.n})
                }}>
                    <View style={styles.boncontainer}>
                        <Text style={styles.textinfobon}>رقم:{b?.n}</Text>
                        <Text style={styles.textinfobon}>تاريخ:{b?.date}</Text>
                        <Text style={styles.textinfobon}>الاجمالي:{b?.total+'درهم'}</Text>
                    </View>
                </TouchableOpacity>)
            })
        }</ScrollView>
    </View>)
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
    btnaddbon:{
        position:'absolute',
        top:50,
        right:20,
        width:80,
        borderRadius:10,
        borderWidth:2,
        alignItems:'center'
    },
    textinfobon:{
        fontFamily:'Taj-regular'
        ,textAlign:'right',
        fontSize:16
    },
    boncontainer:{
        paddingRight:20,
        borderRadius:10,
        borderColor:'black',
        borderWidth:4,
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        padding:2
    }
})