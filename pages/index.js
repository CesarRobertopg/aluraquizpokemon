import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget/index';
import Footer from '../src/components/Footer/index';
import GitHubCorner from '../src/components/GitHubCorner/index';
import QuizBackground from '../src/components/QuizBackground/index';
import QuizLogo from '../src/components/QuizLogo/index';
import Input from '../src/components/Input/index';
import Button from '../src/components/Button/index';
import Link from '../src/components/Link/index';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const quizTitle = db.title;
  const quizBackgound = db.bg;
  const quizDescription = db.description;
  const quizUrl = 'https://aluraquizpokemon.cesarrobertopg.vercel.app/';

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{quizTitle}</title>
        <meta property="og:title" content={quizTitle} key="ogtitle" />
        <meta property="og:image" content={quizBackgound} key="ogimage" />
        <meta property="og:description" content={quizDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={quizUrl} />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quiz Jogos Pokémon!</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Você se considera bom nos jogos de Pokémon?</p>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder="Digite seu nome e prove!"
                value={name}
              />
              {/* eslint-disable-next-line react/button-has-type */}
              <Button type="submit" disabled={name.length === 0}>
                ACEITAR DESAFIO
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, gitHubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      onClick={(event) => {
                        if (name.length === 0) {
                          event.preventDefault();
                          alert('Insira o seu nome!');
                        }
                      }}
                      as={Link}
                      href={`/quiz/${projectName}___${gitHubUser}`}
                    >
                      {`${gitHubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/CesarRobertopg" />
    </QuizBackground>
  );
}
