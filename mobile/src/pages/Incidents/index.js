import React, { useState, useEffect} from 'react';
import{ Feather }from '@expo/vector-icons';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';

import styles from './styles';
import api from '../../services/api';



export default function Incidents(){
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);

    const navigation = useNavigation();
    
    async function loadIncidents(){
        if (loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);
        const response = await api.get('incidents',{
            params:{ page }
        });
        
        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(()=>{
        loadIncidents();
    },[]);

    function navigationToDetail(incident){
        navigation.navigate('Detail',{ incident });
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source ={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style = {styles.title}>Bem-vindo!</Text>
            <Text style = {styles.description}>Descrição</Text>

            <FlatList 
                data={incidents}
                style = {styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached = {loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item:incident })=>(
                    <View style = {styles.incidents}>

                        <Text style = {styles.incidentsProperty}>ONG: </Text>
                        <Text style = {styles.incidentsValue}>{incident.name}</Text>
                    
                        <Text style = {styles.incidentsProperty}>Caso: </Text>
                        <Text style = {styles.incidentsValue}>{incident.title}</Text>
                    
                        <Text style = {styles.incidentsProperty}>Valor: </Text>
                        <Text style = {styles.incidentsValue}> 
                            {Intl.NumberFormat('pt-BR',{
                                style:'currency', 
                                currency:'BRL'
                            }).format(incident.value)}
                        </Text>
                    
                        <TouchableOpacity style={styles.detailsButton} onPress={ ()=>navigationToDetail(incident) }>
                            <Text style = {styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#E02041'/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
