import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert, TouchableWithoutFeedback, Dimensions} from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: {data:[]},
      selected_item: undefined
    }
  }

  componentDidMount() {
    this.getSaleList()
  }

  getSaleList = async () => {
    try {
      let response = await fetch(
        'http://api.modaoperandi.com/public/v3.4/pages/sale'
      );
      let responseJson = await response.json();
      this.setState({
        'items': responseJson
      });
      //console.log(responseJson);      
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    //console.log('render', Object.keys(this.state.items))
    return (
    <View>
      {this.state.selected_item &&
        <TouchableWithoutFeedback onPress={() => {
            this.setState({
              'selected_item': undefined
            });                
          }}>
          <View style={styles.detail}>
            <Text style={styles.title}>
              {this.state.selected_item.attributes.name}                            
            </Text>          
            <Image style={{width: 256, height: 512}} source={{ uri: this.state.selected_item.attributes.variants_data[0].primary_image_urls.large_url}} />
          </View>
        </TouchableWithoutFeedback>
      }
      <ScrollView style={styles.container}>
        {this.state.items.data.map((item) => {
          return (
            <TouchableWithoutFeedback onPress={() => {
                console.log('item:', item);
                this.setState({
                  'selected_item': item
                });                
              }}>
              <View style={styles.box} key={item.id}>
                <View style={styles.thumb}>
                  <Image style={{width: 120, height: 180}} source={{ uri: item.attributes.variants_data[0].primary_image_urls.medium_url}} />
                </View>            
                <Text style={styles.title}>
                  {item.attributes.name}                            
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    zIndex: 10,
    fontSize: 13,
    lineHeight: 14,
    fontWeight: 'light',    
    color: '#999',
    textAlign: 'center',  
    marginBottom: 10,
  },  
  box: {
    flex: 1,
    width: 200,
    height: 220,
    marginBottom: 10,
    marginTop: 10,
    justifyContents: 'center',
    alignItems: 'center',
  },
  detail: {
    zIndex: 100,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    justifyContents: 'center',
    alignItems: 'center',
  },  
  thumb: {    
 
  },
  container: {
    flexWrap: 'wrap', 
    alignItems: 'center',
    flexDirection:'columns',    
    backgroundColor: '#fff',
  },
});