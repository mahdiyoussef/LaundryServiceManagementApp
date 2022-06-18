import react,{useState,useEffect} from "react";
import { StyleSheet,ImageBackground,Text, View,TextInput,Button,TouchableOpacity,Image,AppRegistry,Linking, ScrollView,FlatList,Alert} from 'react-native';
import 'react-native-gesture-handler';
import '../lib/firebase';
import firebase from "firebase";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
export default function detailOp({navigation}) {
    const [dataitems,setdataitems]=useState(null)
    const [bon,setbon]=useState(null)
    const [load,setload]=useState(true) 
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var html=`
    <html>
        <head>
            <meta charset="utf-8" />
            <title>A simple, clean, and responsive HTML invoice template</title>
    
            <style>
                .invoice-box {
                    max-width: 800px;
                    margin: auto;
                    padding: 30px;
                    border: 1px solid #eee;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                    font-size: 16px;
                    line-height: 24px;
                    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                    color: #555;
                    font-family:Taj-bold
                }
    
                .invoice-box table {
                    width: 100%;
                    line-height: inherit;
                    text-align: left;
                }
    
                .invoice-box table td {
                    padding: 5px;
                    vertical-align: top;
                }
    
                .invoice-box table tr td:nth-child(2) {
                    text-align: right;
                }
    
                .invoice-box table tr.top table td {
                    padding-bottom: 20px;
                }
    
                .invoice-box table tr.top table td.title {
                    font-size: 45px;
                    line-height: 45px;
                    color: #333;
                }
    
                .invoice-box table tr.information table td {
                    padding-bottom: 40px;
                }
    
                .invoice-box table tr.heading td {
                    background: #eee;
                    border-bottom: 1px solid #ddd;
                    font-weight: bold;
                }
    
                .invoice-box table tr.details td {
                    padding-bottom: 20px;
                }
    
                .invoice-box table tr.item td {
                    border-bottom: 1px solid #eee;
                }
    
                .invoice-box table tr.item.last td {
                    border-bottom: none;
                }
    
                .invoice-box table tr.total td:nth-child(2) {
                    border-top: 2px solid #eee;
                    font-weight: bold;
                }
    
                @media only screen and (max-width: 600px) {
                    .invoice-box table tr.top table td {
                        width: 100%;
                        display: block;
                        text-align: center;
                    }
    
                    .invoice-box table tr.information table td {
                        width: 100%;
                        display: block;
                        text-align: center;
                    }
                }
    
                /** RTL **/
                .invoice-box.rtl {
                    direction: rtl;
                    font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                }
    
                .invoice-box.rtl table {
                    text-align: right;
                }
    
                .invoice-box.rtl table tr td:nth-child(2) {
                    text-align: right;
                }
            </style>
        </head>
    
        <body>
            <div class="invoice-box">
                <table cellpadding="0" cellspacing="0">
                    <tr class="top">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td>
                                        فاتورة رقم:${bon?.n}<br />
                                        بتاريخ:${date}<br />
                                    </td>
                                    <td class="title">
                                        فاتورة
                                    </td>
    
                                    
                                </tr>
                            </table>
                        </td>
                    </tr>
    
                    <tr class="information">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td>
                                        ${name}<br />
                                        12345 Sunny Road<br />
                                        Sunnyville, CA 12345
                                    </td>
    
                                    <td>
                                        Acme Corp.<br />
                                        John Doe<br />
                                        john@example.com
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
    
    
                    <tr class="heading">
                        <td>Item</td>
    
                        <td>Price</td>
                    </tr>
                    
                    <tr class="item last">
                        <td>TVA</td>
    
                        <td>${20}</td>
                    </tr>
    
                    <tr class="total">
                        <td></td>
    
                        <td>Total:${200}</td>
                    </tr>
                </table>
            </div>
        </body>
    </html>
        `   
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
        firebase.database().ref('/pressingMogador/info').on('value',snapshot=>{
            setdatapr(snapshot.val())
        })
        firebase.database().ref('/pressingMogador/entr/'+1).on('value',snapshot=>{
            setcomdata(snapshot.val())
        })
        firebase.database().ref('/pressingMogador/entr/'+1+'/bon/'+1+'/items').on('value',snapshot=>{
            setdataitems(snapshot.val())
        })
        firebase.database().ref('/pressingMogador/entr/'+1+'/bon/'+1).on('value',snapshot=>{
            setbon(snapshot.val())
            setload(false)
        })
    },[load])
    const [comdata,setcomdata]=useState()
    const [datapr,setdatapr]=useState()
    return(<View style={styles.container}>
       <View style={styles.titleContainer}><Text style={styles.titleText}>تفاصيل</Text></View> 
       <View>
            <Text style={styles.textinfobon}> رقم البون :{bon?.n}</Text>
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
       <TouchableOpacity  onPress={printToFile}>
            <View style={styles.btnsendsms}>
                <Text style={styles.btnsendtext}>طبع الفاتورة</Text>
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