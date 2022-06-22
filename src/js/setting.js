import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
export default function setting({navigation}) {
    const [lastpwd,setlastpwd]=useState()
    const [newpwd,setnewpwd]=useState()
    const [load,setload]=useState(true)
    const [login,setlogin]=useState()
    useEffect(()=>{
        firebase.database().ref('/pressingMogador/items').on('value',snapshot=>{
            if(snapshot.exists()){
                setnitem(snapshot.val())
            }
            else{
                setnitem([1])
            }
        })
        firebase.database().ref('/pressingMogador/services').on('value',snapshot=>{
            if(snapshot.val()){
                setnserv(snapshot.val())
            }
            else{
                setnserv([1])
            }
        })
        firebase.database().ref('/login/pressingMogador').on('value',snapshot=>{
            setlogin(snapshot.val())
            setload(false)
        })
    },[load])
    
    const [updated,setupdated]=useState(false)
    const updateinfo=()=>{
        if(updated){
            return(
                <View>
                    <Text style={{
                    fontFamily:'Taj-bold',marginTop:20,textAlign:'center'
                }}>تم تحذيث كلمة السر بنجاح</Text>
                </View>
            )
        }
        
        else{
            return(<View></View>)
        }
    }
    const [nonupdatedf,setnonUpdated]=useState(false)
    const nonUpdated=()=>{
        if(nonupdatedf){
            return(<View>
                <Text style={{
                    fontFamily:'Taj-bold',marginTop:20,textAlign:'center'
                }}>كلمة السر القديمة خاطئة</Text>
            </View>)
        }
        else{
            return(<View></View>)
        }
    }
    const updatepwd=()=>{
        if(login?.pwd==lastpwd){
            firebase.database().ref('/login/pressingMogador').update({
                pwd:newpwd
            })
            setupdated(true)
            setnonUpdated(false)
        }
        else{
            setnonUpdated(true)
            setupdated(false)
        }
    }
    const [service,setservice]=useState()
    const [nserv,setnserv]=useState()
    const [item,setitem]=useState()
    const [nitem,setnitem]=useState()
    const additem=()=>{
        firebase.database().ref('/pressingMogador/items/'+nitem?.length).set({
            item:item
        })
        setia(true)
        setitem('')
    }
    const addservice=()=>{
        firebase.database().ref('/pressingMogador/services/'+nserv?.length).set({
            service:service
        })
        setsa(true)
        setservice('')
    }
    const [sadded,setsa]=useState(false)
    const [iadded,setia]=useState(false)
    const addsm=()=>{
        if(sadded){
            return(<View>
                <Text style={{
                    fontFamily:'Taj-bold',marginTop:20,textAlign:'center'
                }}>تمت اضافة الخدمة بنجاح</Text>
            </View>)
        }
        else{
            return(<View>

            </View>)
        }
    }
    const addim=()=>{
        if(iadded){
            return(<View>
                <Text style={{
                    fontFamily:'Taj-bold',marginTop:20,textAlign:'center'
                }}>تمت اضافة السلعة بنجاح</Text>
            </View>)
        }
        else{
            return(<View></View>)
        }
    }
    return(
        <View style={{backgroundColor:'white',width:'100%',height:'100%'}}>
            <View style={{
                alignItems:'center',marginTop:50
            }}>
                <View style={{
                    flexDirection:'row'
                }}>
                    <Text style={{
                        textAlignVertical:'center',fontFamily:'Taj-bold',fontSize:20
                    }}>الاعدادات</Text>
                    <Image source={require('../icons/icons8-setting-48.png')} />
                </View>
            </View>
            <Text style={{
                fontFamily:'Taj-bold',fontSize:16,textAlign:'center'
            }}><Image source={require('../icons/key.png')} /> تغيير كلمة السر{'\n'}</Text>
            <TextInput value={lastpwd} onChangeText={(text)=>{
                setlastpwd(text)
            }} style={styles.input} placeholder="كلمة السر القديمة" placeholderTextColor={'#130f40'} />
            <TextInput value={newpwd} onChangeText={(text)=>{
                setnewpwd(text)
            }} style={styles.input} placeholder="كلمة السر الجديدة" placeholderTextColor={'#130f40'} />
            <TouchableOpacity onPress={()=>{
                    updatepwd()
                }}>
                <View style={styles.btn}>
                    <Text style={{
                        fontFamily:'Taj-bold',fontSize:18,color:'white',textAlign:'center'
                    }}>تحذيث</Text>
                </View>
            </TouchableOpacity>
            {updateinfo()}
            {nonUpdated()}
            <Text style={{
                fontFamily:'Taj-bold',fontSize:18,color:'black',textAlign:'center',marginTop:20
            }}><Image source={require('../icons/washing-machine.png')} /> اضافة خدمة</Text>
            <TextInput value={service} onChangeText={(text)=>{
                setservice(text)
            }} style={styles.input} placeholder="الخدمة" placeholderTextColor={'#130f40'} />
            <TouchableOpacity onPress={()=>{
                    addservice()
                }}>
                <View style={styles.btn}>
                    <Text style={{
                        fontFamily:'Taj-bold',fontSize:18,color:'white',textAlign:'center'
                    }}>اضافة</Text>
                </View>
            </TouchableOpacity>
            {addsm()}
            <Text style={{
                fontFamily:'Taj-bold',fontSize:18,color:'black',textAlign:'center',marginTop:20
            }}><Image source={require('../icons/tshirt.png')} /> اضافة سلعة</Text>
            <TextInput value={item} onChangeText={(text)=>{
                setitem(text)
            }} style={styles.input} placeholder="سلعة" placeholderTextColor={'#130f40'} />
            <TouchableOpacity onPress={()=>{
                    additem()
                }}>
                <View style={styles.btn}>
                    <Text style={{
                        fontFamily:'Taj-bold',fontSize:18,color:'white',textAlign:'center'
                    }}>اضافة</Text>
                </View>
            </TouchableOpacity>
            {addim()}
        </View>
    )
}
const styles=StyleSheet.create({
    input:{
        fontFamily:'Taj-regular',
        textAlign:'center',
        fontSize:16,
        borderRadius:10,
        padding:10,
        marginLeft:40,
        marginRight:40,
        borderWidth:4,
        borderColor:'#130f40',
        marginTop:10
    },
    btn:{
        borderRadius:10,
        padding:10,
        marginLeft:40,
        marginRight:40,
        borderWidth:4,
        borderColor:'#130f40',
        marginTop:10,
        backgroundColor:'#130f40'
    }
})