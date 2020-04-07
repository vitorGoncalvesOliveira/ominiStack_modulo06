import React , { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';


import api from '../../services/api';
import Repository from '../repository/index';
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    Container,
    Header,
    Avatar,
    Bio,
    Name,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
    OpenRepository } from './styles';


export default class User extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name,
    })

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func
        }).isRequired,
    }

    state = {
        stars: [],
        loading: true,
        page:1,
    }

    async componentDidMount(){

        const { navigation } = this.props;
        const user = navigation.getParam('user');
        const response = await api.get(`/users/${user.login}/starred`);

        this.setState({
            stars: response.data,
            loading: false,
        })

    }

    loadMore = async () => {

        const { stars, page } = this.state;
        const { navigation } = this.props;
        let newPage = page + 1;

        const user = navigation.getParam('user');
        const response = await api.get(`/users/${user.login}/starred?page=${newPage}`);

        let newStars = [ ...stars, ...response.data]
        console.tron.log(newStars)

        this.setState({
            stars: newStars,
            page: newPage,
        })
    }

    openRepository( repository ){
        const { navigation } = this.props;
        navigation.navigate('Repository', { repository })

    }

    render(){
        const { navigation } = this.props;
        const { stars , loading } = this.state;

        const user = navigation.getParam('user');

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{ user.name }</Name>
                    <Bio>{ user.bio || "" }</Bio>
                </Header>
                {   loading ?
                    <ActivityIndicator color="#7159c1" size="large" />
                    :
                    <Stars
                        data={stars}
                        keyExtractor={star => String(star.id)}
                        onEndReachedThreshold={0.2}
                        onEndReached={this.loadMore}
                        renderItem={({ item }) => (
                            <Starred>
                                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                                <Info>
                                    <Title>{item.name} </Title>
                                    <Author>{item.owner.login}</Author>
                                    <OpenRepository
                                        onPress={()=>{ this.openRepository(item)}}>
                                        <Icon name="web" color="#FFFF" />
                                    </OpenRepository>
                                </Info>
                            </Starred>
                        )}
                    ></Stars>
                }

            </Container>

        )
    }
};

