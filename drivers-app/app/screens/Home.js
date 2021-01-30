import React, { useRef } from "react";
import { Animated, ScrollView, Linking, View, ImageBackground, StyleSheet,TouchableOpacity } from "react-native";
import { Card, Image, Avatar, Accessory  } from "react-native-elements";
import { Container, Header, Text, Content, Input, Item, Textarea , Form, Button, Icon, Badge, List, ListItem, Left, Body, Right, Thumbnail, Tab, Tabs,TabHeading } from 'native-base';

import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from '@react-navigation/native';


class Home extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      sheetOpacity: 'rgba(0,0,0, 0.4)', 
      sheetIndex:99,
      serviceBannerText:'',
      serviceIconName:'',
      iconOpacity:0,
      displayServices:'flex',
      displayTackingMap:'none',
    }
  }


  

  startServiceSteps = () => {
    this.setState({
      sheetOpacity: 'rgba(0,0,0, 0.9)', 
      sheetIndex:999,
      iconOpacity:1,
    });
  }

  closeServiceSteps = () => {
    this.setState({
      sheetOpacity: 'rgba(0,0,0, 0.4)', 
      sheetIndex:99,
      serviceBannerText:'',
      serviceIconName:'',
      iconOpacity:0,
    });
  }

  serviceSelected = (selService, selServiceIcon) => {
    this.setState({
      serviceBannerText:selService,
      serviceIconName:selServiceIcon,
    });
  }

  trackDriver = () =>{
    this.setState({
      displayServices:'none',
      displayTackingMap:'flex',
    })
  }

  goToDashboard = () =>{
    this.setState({
      displayServices:'flex',
      displayTackingMap:'none',
    })
  }





/***************************************
      Map and Location COMPONENET
****************************************/
mapAndLocation = () => {
  const image = { uri: "https://intellogistics.pharrage.co.za/order-form/images/map-bg.png" };
  const navigation = this.props.useNavigation;
  return(
    <View style={[styles.infoContainer, bgColors.mainBlue]}>
      <ImageBackground source={image} style={styles.bgImageStyle}>
      <View
        style={{
          backgroundColor:this.state.sheetOpacity,
          position:'absolute',
          width:'100%',
          height:500,
          top:0,
          bottom:0,
          flex:1,
          alignItems:"center",
          justifyContent:'center',
          zIndex:this.state.sheetIndex,
        }}
      >
        <View style={{marginTop:-200, alignItems:'center', }}>
          <Icon name={this.state.serviceIconName} style={[{fontSize:30, opacity:this.state.iconOpacity, marginBottom:10, color:'black', backgroundColor:'white', padding:15, borderRadius:60,}]}/>
          <Text style={{fontWeight:'100', color:'#ffffff', fontSize:30}}>
            {this.state.serviceBannerText}
          </Text>
        </View>
        
      </View>
      
      <View style={{position:'relative', zIndex:99,}}>
        <TouchableOpacity 
        style={{
          padding:4,
          paddingRight:8,
          marginLeft:15, 
          backgroundColor:'#c7b946', 
          borderRadius:50, 
          flex: 1,
          flexDirection:'row',
          alignItems:'center',
          alignSelf: 'flex-start'
        }} 
          onPress ={() => navigation.openDrawer()}
        >
          <Avatar
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
          <View>
            {/* <Text style={{color:"white", marginLeft:10, marginRight:10}}>
              Hello, Ephraim
            </Text> */}
            <Text style={{color:"white", fontWeight:'bold', marginLeft:10, marginRight:10}}>
              ONLINE
            </Text>
          </View>
          
        </TouchableOpacity>
        
          <View style={styles.bgView}>
          
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              {/* <Icon active name='location-pin' style={[{fontSize:25, paddingTop:5, marginRight:10, }, textColors.mainBlue]}/> */}
              <View>
                <Text style={[styles.text, textColors.white]}>Current Delivery</Text>
                <Text style={[styles.pText, textColors.white]}>Saddle Rock Complex, Wilgespruit 190-Iq, Roodepoort, South Africa</Text>
              </View>
            </View>
            
            {/* <View style={styles.driverCount}>
              <Text style={[styles.textMed, textColors.white]}>Deliv</Text>
              <Text style={[styles.textLarge, textColors.white]}>12</Text>
            </View> */}
            
          </View>
        </View>
        </ImageBackground>
      </View>
  )
}


/***************************************
      Select Service COMPONENET
****************************************/
pickupItemButton = () =>{
  return(
   
    <TouchableOpacity style={[styles.ServiceBtn, bgColors.lightGrey]} onPress={() => {this.RBSheet.open(); this.serviceSelected("Quick Errand", 'bicycle')}}>
      <View style={styles.ServiceBtnView}>

        <View style={[styles.servIcon, textColors.mainBlue]}>
          <Icon name='bicycle' style={[{fontSize:30,},textColors.mainBlue]}/>
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.ServiceBtnHeading}>Quick Errand</Text>
          <Text style={[styles.ServiceBtnText, textColors.mainGrey]}>Get a driver to quickly pick up and drop off small items for you.</Text>
        </View>
      </View>
    </TouchableOpacity>
 
  );
}


deliveryItemButton = () =>{
  return(

    <TouchableOpacity style={[styles.ServiceBtn, bgColors.lightGrey]} onPress={() => {this.RBSheet.open(); this.serviceSelected("Quick Errand", 'bicycle')}}>
      <View style={styles.ServiceBtnView}>

        <View style={[styles.servIcon, textColors.mainBlue]}>
          {/* <Icon name='bicycle' style={[{fontSize:15,},textColors.mainBlue]}/> */}
          <Text style={[{fontSize:15,},textColors.mainBlue]}>15.5</Text>
          <Text style={[{fontSize:12, fontWeight:'bold'},textColors.mainBlue]}>KM</Text>
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.ServiceBtnHeading}>Ephraim Kgwele</Text>
          <Text style={[styles.ServiceBtnText, textColors.mainGrey]}>Saddle Rock Complex, Wilgespruit 190-Iq, Roodepoort, South Africa</Text>
        </View>
      </View>
    </TouchableOpacity>

  );
}


/***************************************
      Bottom Sheet steps COMPONENET
****************************************/

serviceBottomDrawer = () =>{
return(
<RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        onClose={this.closeServiceSteps}
        onOpen={this.startServiceSteps}
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={500}
        dragFromTopOnly={true}
        height={600}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#E5E5E5",
          },
          container: {
            borderRadius:20,
            // backgroundColor:'#f7f7f7'
          }
        }}
      >

        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 20, height:'100%', }}>

              
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{fontSize:13,}}>Waybill no:</Text>
                      <Text style={{fontWeight:'bold', textTransform:'uppercase'}}>NG-4645324</Text>
                    </View>
                    
                    <View style={[bgColors.lightGrey, {flexDirection:'row', width:'100%', height:200, marginTop:20, paddingBottom:15, borderRadius:10}]}>            
                    <Content >
                      <List>
                       
                        <ListItem avatar>
                          <Left>
                            {/* <Thumbnail source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} /> */}
                              <Icon active name='map-pin' style={[{fontSize:20}, textColors.mainBlue]}/>
                          </Left>
                          <Body>
                            <Text style={{fontWeight:'bold', }}>Deliver To</Text>
                            <Text note style={textColors.mainGrey}>Saddle Rock Complex, Wilgespruit 190-Iq, Roodepoort, South Africa</Text>
                            <Text note style={[{marginTop:10},textColors.mainGrey]}> 2nd Floor, Unit 7</Text>
                          </Body> 
                          <Right>
                          <Badge info>
                            <Text notes style={{color:'white'}}>14 KM</Text>
                            </Badge>
                          </Right> 
                        </ListItem>

                         <ListItem avatar>
                          <Left>
                            <Icon active name='map-pin' style={[{fontSize:20}, textColors.mainBlue]}/>
                          </Left>
                          <Body>
                            <Text style={{fontWeight:'bold', }}>Notes</Text>
                            <Text note style={[{fontSize:16,},textColors.mainGrey]}>Please call me when you arrive at the gate.</Text>
                          </Body>
                        </ListItem>

                      </List>
                    </Content>
                    </View>


                    {/* <View style={{marginTop:20, alignItems:'center',flexDirection:'row', width:'100%'}}>
                      <Button bordered rounded style={{marginRight:20 }}>
                        <Text style={{ alignItems:'center', }}>Call</Text>
                      </Button>
                      <Button bordered success rounded>
                        <Text style={{ alignItems:'center', }}>Text</Text>
                      </Button>
                    </View> */}

                    <View style={{marginTop:20, alignItems:'center', }}>
                      <Button rounded full onPress = {() => this.trackDriver()}> 
                        <Text style={{color:'#ffffff', alignItems:'center', }}>Start Delivery</Text>
                      </Button>
                    </View>

                    <View style={{marginTop:20, alignItems:'center', }}>
                      <Button danger rounded full> 
                        <Text style={{color:'#ffffff', alignItems:'center', }}>Decline</Text>
                      </Button>
                    </View>
    

            </ScrollView>
          </View>

      </RBSheet>
)
}


/***************************************
      tracking map COMPONENET
****************************************/

trackingMap = () => {
  const image = { uri: "https://intellogistics.pharrage.co.za/order-form/images/map-bg.png" };
  return(
    <View style={[styles.infoContainer, bgColors.mainBlue]}>
      <ImageBackground source={image} style={[styles.bgImageStyle,{height:600, padding:20,}]}>

      <Button rounded style={{position:'absolute', bottom:215, right:20}}>
        <Icon type="AntDesign" name="enviromento" style={{paddingLeft:0, paddingRight:0, fontSize:20, color:'white'}} />
      </Button>

      <Button rounded style={{position:'absolute', bottom:150, right:20,}} onPress = {() => this.RBSheet.open()}>
        <Icon type="AntDesign" name="infocirlceo" style={{fontSize:20,  color:'white'}} />
      </Button>

       <View style={[bgColors.darkGrey,{opacity:0.85,flexDirection:'row', width:'100%', marginTop:0,padding:10, borderRadius:15, position:'absolute', left:20, bottom:20,}]}>

            <View style={{ width:'40%', borderRightWidth:1, borderColor:'white'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Avatar
                    rounded
                    style={{height:50, width:50, borderRadius:100}}
                    source={{
                      uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                  />

                  <View style={{marginLeft:10,}}>
                      <Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>
                          Malose
                      </Text>
                      <Text style={{fontSize:16, fontWeight:'bold', color:'white'}}>
                          Kgwele
                      </Text>
                  </View>
                        
                </View>

            </View>

            <View style={{ width:'60%',paddingLeft:20,}}>
                <Text style={{color:'white', marginBottom:10}}>
                  25 Min
                </Text>

                <Text style={{color:'white'}}>
                Saddle Rock Complex, Wilgespruit 190-Iq, Roodepoort, South Africa
                </Text>

            </View>

        </View>

      </ImageBackground>
    </View>
  )
}

driverCommunication = () => {
  return(
    <View style={[bgColors.white,{width:'100%',padding:20,}]}>

{/* 
        <View style={{marginBottom:10, alignItems:'center', flex:1, width:'100%', flexDirection:'row', justifyContent:'center'}}>
          <Button transparent onPress ={() => this.RBSheet.open() }>
            <Text style={[textColors.mainBlue, {fontWeight:'bold', textTransform:'uppercase'}]}>Manage Delivery</Text>
          </Button>
        </View> */}
        

        <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
          <Content>
            <Item rounded>
              <Input style={{paddingLeft:25}} placeholder='Send Message...'/>
            </Item>
          </Content>
          <Icon type="AntDesign" name="message1"  style={[bgColors.mainBlue,{padding:15, color:'white', marginLeft:10, fontSize:18, borderRadius:50}]} />
          <Icon type="AntDesign" name="phone" style={[bgColors.mainBlue,{padding:15, color:'white', marginLeft:10, fontSize:18, borderRadius:50}]} />
        </View>

    </View>
  )

}


  // Value: 0
  fadeAnim = new Animated.Value(0);

  fadeIn = () => {
  // Will change fadeAnim value to 1 in 5 seconds
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 5000
  }).start();
};

  fadeOut = () => {
  // Will change fadeAnim value to 0 in 5 seconds
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 5000
  }).start();
};




/***************************************
 RENDER ********************************
****************************************/
render() {

  const navigation = this.props.useNavigation;

  

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000"
        }}
      >



      <View style={{flex:1, width:'100%', display:this.state.displayServices}}>
        {this.mapAndLocation()}  

        <Tabs>
        <Tab heading="DELIVERIES">
            <View style={[styles.serviceContainer, bgColors.white]}>
              {this.deliveryItemButton()} 
              {this.deliveryItemButton()} 
              {this.deliveryItemButton()} 
            </View> 
          </Tab>
          <Tab heading="PICKUPS">
            <View style={[styles.serviceContainer, bgColors.white]}>
              {this.pickupItemButton()} 
            </View> 
          </Tab>
        </Tabs>
        {this.serviceBottomDrawer()}
      </View>
      
      
        <ScrollView style={{flex:1, width:'100%', height:'100%', display:this.state.displayTackingMap}}>
          {this.trackingMap()}
          {this.driverCommunication()}
        </ScrollView>
      
 
      </View>
    </ScrollView>
  );
}
}


export default Home;

const textColors = StyleSheet.create({
  mainBlue:{color:'#0066cc', borderColor:'#0066cc'},
  darkBlue:{color:'#0066cc', borderColor:'#0066cc'},
  lightBlue:{color:'#0066cc', borderColor:'#0066cc'},
  mainGrey:{color:'#888888', borderColor:'#0066cc'},
  lightGrey:{color:'#F5F5F5', borderColor:'#0066cc'},
  darkGrey:{color:'#555555', borderColor:'#0066cc'},
  black:{color:'#0000', borderColor:'#0000'},
  white:{color:'#ffffff', borderColor:'#ffffff'},
});

const bgColors = StyleSheet.create({
  mainBlue:{backgroundColor:'#0066cc', borderColor:'#0066cc'},
  darkBlue:{backgroundColor:'#3c2a77', borderColor:'#0066cc'},
  lightBlue:{backgroundColor:'#0066cc', borderColor:'#0066cc'},
  mainGrey:{backgroundColor:'#E5E5E5', borderColor:'#0066cc'},
  lightGrey:{backgroundColor:'#F5F5F5', borderColor:'#0066cc'},
  darkGrey:{backgroundColor:'#555555', borderColor:'#0066cc'},
  black:{backgroundColor:'#0000', borderColor:'#0000'},
  white:{backgroundColor:'#ffffff', borderColor:'#ffffff'},
});

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    paddingBottom:0,
    width:"100%",
    height:'100%'
  },
  bgView:{
    padding:20,
  },
  serviceContainer:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width:"100%",
    padding:20,
  },
  bgImageStyle: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width:'100%',
    left:0,
    right:0,
    paddingTop:80,
    paddingBottom:30,
    height:'100%'
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom:5,
  },
  textMed: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom:5,
    marginTop:15,
  },
  textLarge: {
    fontSize: 50,
    marginBottom:5,
    fontWeight: '100',
  },
  pText: {
    fontSize: 14,
    width:'80%',
  },
  ServiceBtn: {
    alignItems: "flex-start",
    padding: 10,
    marginTop:5,
    marginBottom:5,
    width:'100%',
    borderRadius:15,
    paddingRight:10,
  },
  ServiceBtnHeading:{
    fontWeight:"bold",
    textTransform:"uppercase",
    marginBottom:5,
  },
  ServiceBtnView:{
    flex: 1, 
    flexDirection: 'row'
    
  },
  serviceIcon:{
    width:'20%',
    marginRight:10,
  },
  servIcon:{
    flex:1,
    marginRight:10,  
    borderWidth:3, 
    alignItems:'center', 
    justifyContent: "center", 
    width:55,
    height:60,  
    borderRadius:60,
  },
  serviceInfo:{
    width:'78%',
  },
  driverCount:{
    // borderTopWidth:1,
    backgroundColor:'#3c2a77',
    marginTop:26,
    borderRadius:15,
    paddingLeft:20,
    paddingRight:20,
    alignSelf:'flex-start'
  },
  buttonTextStyle:{
    color:'white',
  }
});
