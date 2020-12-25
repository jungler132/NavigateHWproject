import React, { Component } from 'react';
import allStyles from '../stylesfilm'
import { View,Text, ScrollView, TouchableOpacity, TextInput, Image, Modal} from 'react-native';

class ViewStyle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieName:"kung fu",
            dataBase: [],
            modalWindow:false,
            temp:[]
        }
    }
    noImg = "https://tl.rulate.ru/i/book/19/10/18925.jpg"
    componentDidMount = async () => {
        this.getMovieData()
    }
    getMovieData = async () => {
            try{
                const answer = await fetch(`http://api.tvmaze.com/search/shows?q=${this.state.movieName}`)
                const dataBase = await answer.json()
                this.setState({ dataBase })
                console.log(dataBase)
            }
            catch (e){
                console.log("ERROR INCORRECT URL")
            }
    }
    searchOperation = (text) => {
        //В конце ввода должен менять стейт movieName:"Matrix" на вписанный в TextInput
        this.setState({movieName : text})
    }
    render() {
        return (
            <View style={allStyles.styles.mainScreenFilmFlex}> 
                <View style={allStyles.styles.mainScreenTopStyle}>
                <TextInput onChangeText={text => this.searchOperation(text)} placeholder="Tap here" placeholderTextColor="teal" style={allStyles.styles.textInputtouchOpStyle}/>
                <TouchableOpacity onPress={this.getMovieData} style={allStyles.styles.touchOpPTF}>
                    <Text style={allStyles.styles.touchOpPTFTextStyle}>
                    PUSH TO FIND
                    </Text>
                </TouchableOpacity>
                </View >
                <View style={allStyles.styles.searchPanelViewStyle}>
                <ScrollView style={{flex:1}}>
                <Text style={allStyles.styles.searchPanelTextStyle}>
                    SEARCH RESULTS :
                </Text>
                {this.state.dataBase.map((item,index) => (
                <View key={index} style={allStyles.styles.mappedPieceViewStyle}>
                <Image source={{uri: item?.show?.image?.medium ?? this.noImg}} style={allStyles.styles.imageSourceStyle}/>
                <Text style={allStyles.styles.movieNameTextStyle}>
                    {item.show.name}
                </Text>
                <TouchableOpacity onPress={() => {this.setState({modalWindow:true , temp : item})}} style={allStyles.styles.touchOpMS}>
                    <Text>
                        Movie Stats
                    </Text>
                </TouchableOpacity>
                </View>))}
                </ScrollView>
                <Modal transparent={true} visible={this.state.modalWindow}>
                    <View style={allStyles.styles.modalView}>
                        <View style={allStyles.styles.modalViewInside}>
                            <TouchableOpacity onPress={() => {this.setState({modalWindow:false})}} style={allStyles.styles.XbuttontouchStyle}>
                                <Text>
                                    X
                                </Text>
                            </TouchableOpacity>
                            <Text>
                                
                            </Text>
                        </View>
                    </View>
                </Modal>
                </View >
            </View>
        );
    }
} 
export default ViewStyle