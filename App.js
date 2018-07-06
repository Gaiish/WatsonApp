import React, {Component} from 'react'
import {
  Container, Content, Button, Icon, Text, Fab, Header,
  Title, Body, Left, Spinner
} from 'native-base'
import{
  StyleSheet, View, Alert
} from 'react-native'

import {SpeechToText, TextToSpeech} from 'react-native-watson'
import Permissions from 'react-native-permissions'
//import AudioRecord from 'react-native-audio-record'


export default class App extends Component{
  state={
    text:'...',
    speak: stories[Math.floor(Math.random()*8)],
    recording: false
  }

  record(){
    console.log('recording')
    this.setState({recording:true})
    //AudioRecord.start()
    SpeechToText.startStreaming((err, text)=>{
      if(!err){
        console.log(text)
        this.setState({text})
      }
      console.log(err)
    })
  }

  stopRecord(){
    console.log('stopped recoding')
    this.setState({recording:false})

    //let audio = AudioRecord.stop()
    //console.log('audio file:', audio)
    SpeechToText.stopStreaming()
  }

  componentDidMount(){
    this.checkPermission()

    SpeechToText.initialize(Your_USERNAME, YOUR_PASSWORD)
    TextToSpeech.initialize(YOUR_USERNAME, YOUR_PASSWORD)
  }

  checkPermission(){
    const p = Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') return;
    this.requestPermission();
  }

  requestPermission(){
    const p = Permissions.request('microphone');
    console.log('permission request', p);
  }

  play(){
    console.log('playing')
    /*TextToSpeech.getVoices()
      .then(voices=> voices.forEach(voice => console.log('voice:',voice)))
      .catch(err=>console.log(err))*/
    //this.setState({recording:true})
    TextToSpeech.synthesize(stories[Math.floor(Math.random()*8)], voices[Math.floor(Math.random()*4)])

  }

  render(){
    return(
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Genius List</Title>
          </Body>
        </Header>
        <View style={{flex:1}}>
          <Text style={styles.txt}>{this.state.text}</Text>
          {this.state.recording?(
            <Spinner
               color='blue' />

          ):(
            <Text style={styles.txt1} note>record now</Text>
          )}
          <Fab
            position='bottomRight'
            onPressIn={()=>this.record()}
            onPressOut={()=>this.stopRecord()}
            >
            <Icon name='mic' />
          </Fab>
          <Fab
            position='bottomLeft'
            onPress={()=>this.play()}
            >
            <Icon name='ios-play' />
          </Fab>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  fab: {
     backgroundColor: '#5067FF',
     position: 'absolute',
     bottom: 30,
     right:25
  },
  txt:{
    padding: 50,
    fontSize: 25
  },
  txt1:{
    padding: 50,
    fontSize: 30
  }
})

var stories = [
  `Doctor: 'I'm sorry but you suffer from a terminal illness and have
    only 10 to live.'
    Patient: 'What do you mean, 10? 10 what? Months? Weeks?!'
    Doctor: 'Nine.'
  `,
  ` A man asks a farmer near a field, 'Sorry sir, would you mind
    if I crossed your field instead of going around it?
    You see, I have to catch the 4:23 train.'
    The farmer says, 'Sure, go right ahead. And if my bull sees you,
    you’ll even catch the 4:11 one.'
  `,
  `Anton, do you think I’m a bad mother?
    My name is Paul.
  `,
  `My dog used to chase people on a bike a lot. It got so bad,
  finally I had to take his bike away.
  `,
  `
    Mother: 'How was school today, Patrick?'
    Patrick: 'It was really great mum! Today we made explosives!'
    Mother: 'Ooh, they do very fancy stuff with you these days.
    And what will you do at school tomorrow?'
    Patrick: 'What school?'
  `,
  `
    Sleep with an open window tonight!
    1400 mosquitos like that. 420 mosquitos commented on it. 210 mosquitos
    shared this.
    One mosquito invited for the event. 2800 mosquitos will be attending
    the event.
  `,
  `
    Police officer talks to a driver: Your tail light is broken, your tires must be
    exchanged and your bumper hangs halfway down. That will be 300 dollars.
    Driver: Alright, go ahead. They want twice as much as that at the garage.
  `,
  `
    Why did the physics teacher break up with the biology teacher? There was no chemistry.
  `
]

var voices = [
  "en-GB_KateVoice",
  "en-US_AllisonVoice",
  "en-US_LisaVoice",
  "en-US_MichaelVoice"
]
