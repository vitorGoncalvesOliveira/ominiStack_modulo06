import React , { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class Repository extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('repository').name,
    })

    state = {
        uri: "",
    }

    componentDidMount(){
        const { navigation } = this.props;
        const repositorio = navigation.getParam('repository');
        console.tron.log(repositorio);
        this.setState({ uri: repositorio.html_url })
    }

    render(){
        const { uri } = this.state
        return(
            <WebView
                source={ { uri: uri }}
                style={{ flex:1}}
            />
        )
    }
}



