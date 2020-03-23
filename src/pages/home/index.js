import React, { useState } from "react";

import axios from "axios";
import temperatura from "../../services/Temperatura";
import conversor from "../../services/Conversor";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import imageSearch from "../../services/GoogleSearch";
import "./styles.css";

export default function Home() {
  const [cidade, setCidade] = useState('');
  const [error, setError] = useState();
  const [tipo, setTipo] = useState('');
  const [pokemon, setPokemon] = useState('');
  const [firstPoke, setFirstPoke] = useState('');
  const [pokeImagem, setPokeImagem] = useState('');
  const [rain, setRain] = useState(false);
  const [temp, setTemp] = useState('');
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(1);

    if (!cidade) {
      setError("Preencha o campo corretamente.");
    }
    setError(false);
    // CALL API TEMP
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=4a66b1581aa7280c017fad8a1c984816`).then(response => {
      const temp = response;

      axios.get(`https://pokeapi.co/api/v2/type/${temperatura(parseInt(conversor(temp.data.main.temp), temp.data.weather.main))}`).then(function (response) {
        setRain(temp.data.weather.main);
        const sort = parseInt(Math.random() * (response.data.pokemon.length - 1) + 1);

        setFirstPoke(response.data.pokemon[sort].pokemon.name);
        setTipo(temperatura(parseInt(conversor(temp.data.main.temp), temp.data.weather.main)));
        setTemp(conversor(temp.data.main.temp));
        if (response.data.pokemon[sort].pokemon.name === firstPoke)
          setPokemon(response.data.pokemon[sort - 1].pokemon.name);
        else
          setPokemon(response.data.pokemon[sort].pokemon.name);
        console.log(response.data.pokemon[sort].pokemon.name + ' | Pokédex');
        imageSearch(response.data.pokemon[sort].pokemon.name + ' | Pokedex').then(images => {
          if (images[0].pagemap.cse_thumbnail) {
            setPokeImagem(images[0].pagemap.cse_thumbnail[0].src);
          } else {
            setPokeImagem('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png');
          }

        });

      });

    })
      .catch(error => {
        alert('cidade não encontrada');
        setPokeImagem('');
        setPokemon('');
        setRain(false);
        setTemp('');
        console.log(error);
      });
    // if (temp.data.cod === 404) {
    //   setError(temp.data.message);
    // }
    // CALL API POKE COM BASE NA CIDADE



  };

  return (
    <>

      <div id="app">
        <aside>
          <Jumbotron>
            <Container>
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                  <span className="title">Find your Pokemon</span>
                </Col>
              </Row>

              {error ? error : ''}
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control type="text" placeholder="Digite a cidade" onChange={(e) => setCidade(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Consultar
                </Button>
              </Form>
            </Container>
          </Jumbotron>
        </aside>
      </div>
      {
        pokemon ?

          <Container>
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <h5>Nome: {pokemon}</h5>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <h5>Espécie: {tipo}</h5>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <h5>Temperatura: {parseInt(temp)} °C - {rain === 'Rain' ? 'Chovendo' : "Sem Chuva"}</h5>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <Figure>
                  <Figure.Image src={pokeImagem} thumbnail />
                </Figure>
              </Col>
            </Row>
          </Container>
          :
          ''
      }

    </>
  );

}
