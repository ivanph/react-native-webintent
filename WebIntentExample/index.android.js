'use strict';

var React = require('react-native');
var WebIntent = require('react-native-webintent');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} = React;

var WebIntentExample = React.createClass({
  getInitialState: function() {
    return {url: ''};
  },
  openLink: function() {
      WebIntent.open(this.state.url)
  },
  updateUrl: function (text) {
    this.setState({url: text});
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} onChange={(event) => this.updateUrl(event.nativeEvent.text)}
          placeholder='Enter a url' />
         <TouchableOpacity style={styles.button} onPress={this.openLink}>
           <Text style={styles.instructions} >
             Click to open url
           </Text>
         </TouchableOpacity>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    width: 230,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#563D7C',
  },
  input: {
    width: 230,
  },
  instructions: {
    textAlign: 'center',
    color: '#563D7C',
  },
});

AppRegistry.registerComponent('WebIntentExample', () => WebIntentExample);
