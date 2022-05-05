import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./Country.css";

interface CountryInfo {
    flags: {
        png: string,
        svg: string
    },
    capital: string,
    population: number,
    latlng: number[]
}

interface CapitalWeather {
    temperature: number,
    weather_icons: string[],
    wind_speed: number,
    timezone_id:string[],
}

const Country: React.FC = () => {
    const { countryName } = useParams<string>();
    const [country, setCountry] = useState<CountryInfo | undefined>();
    const [capitalName, setCapitalName] = useState<string | undefined>();
    const [capitalWeather, setCapitalWeather] = useState<CapitalWeather | undefined>();
    const [isLoading, setLoading] = useState<boolean>(true);

    const navigateWeather = useNavigate();

    const handleWeather =()=>{
        navigateWeather(`/${country?.capital}`)
    }

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(({ data }) => {
                setCountry(data[0])
            })
    }, [countryName]);

    const getWeatherInfo = (capitalName: string) => {
        axios.get(`http://api.weatherstack.com/current?access_key=9d00731ea277f2dca66e102f0e43c973&query=${capitalName[0]}`)
            .then(({ data }) => {
                console.log(capitalName[0]);
                setCapitalWeather(data?.current);
            })
    }
    console.log(capitalWeather);

    return (
        <div className="countrysection">
            <div>
                <header className="header">
                    <a href="" className="logo">
                        <p>Weather App</p>
                    </a>
                </header>
            </div>
            <div className="container">

                <Grid container spacing={2} sx={{ textAlign: 'center' }}>

                    <Grid item xs={3} sx={{ margin: '200px auto' }}>
                        {
                            country?.population ?
                                <Card sx={{ maxWidth: '100%', textAlign: 'left' }}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={country?.flags?.png}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                            Country: {countryName}
                                        </Typography>

                                        <Typography gutterBottom variant="h5" component="div">
                                            Capital: {country?.capital}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Population: {country?.population}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'start', margin: '6px 0px', width: '100%' }}>
                                            <Typography sx={{ marginRight: '15px' }} variant="body2" color="text.secondary">
                                                Latitude: {country?.latlng[0]}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Longitude: {country?.latlng[1]}
                                            </Typography>
                                        </Box>
                                        {
                                            capitalWeather &&
                                            <Box>
                                                {
                                                    <>
                                                        <Typography sx={{ marginRight: '15px' }} variant="body2" color="text.secondary">
                                                            Temperature: {capitalWeather?.temperature} °Celsius
                                                        </Typography>
                                                        <img src={capitalWeather?.weather_icons[0]}></img>
                                                        <Typography sx={{ marginRight: '15px' }} variant="body2" color="text.secondary">
                                                            Wind Speed: {capitalWeather?.wind_speed} m/s
                                                        </Typography>                                                    
                                                        <Typography variant="body2" color="text.secondary">
                                                            Time Zone ID: {capitalWeather?.timezone_id}
                                                        </Typography>
                                                    </>
                                                }
                                            </Box>

                                        }
                                    </CardContent>
                                    <CardActions>
                                        <Button sx={{ margin: '25px 0px' }} onClick={() => getWeatherInfo(country?.capital)}>Capital Weather</Button>
                                    </CardActions>                               
                                </Card>
                                :
                                <CircularProgress />
                        }
                    </Grid>
                </Grid>


            </div>

        </div>
    );
};

export default Country;