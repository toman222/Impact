import { Model } from '../components/model'

import Head from 'next/head'

import * as React from 'react'

export default class extends React.Component {
  render() {
    return (
      <>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Fira+Code' />
          <link rel='stylesheet' type='text/css' href='impact.css' />
          <title>U r stimky</title>
        </Head>
        <p>
          Rember 2 taek ur meds uwu<br/>stinky
        </p>
      </>
    )
  }
}
