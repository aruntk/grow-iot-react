import React from 'react'
import Router from 'next/router'

import Modal from '../components/modal'

export default class extends React.Component {
  static getInitialProps () {
    return {
      things: new Array(15).fill(0).map((v, k) => k + 1)
    }
  }

  constructor (props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  // handling escape close
  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown (e) {
    if (!this.props.url.query.thingId) return
    if (e.keyCode === 27) {
      this.props.url.back()
    }
  }

  dismissModal () {
    Router.push('/')
  }

  showThing (e, id) {
    e.preventDefault()
    Router.push(`/?thingId=${id}`, `/thing?id=${id}`)
  }

  render () {
    const { url, things } = this.props

    return (
      <div className='list'>
        {
          url.query.thingId &&
            <Modal
              id={url.query.thingId}
              onDismiss={() => this.dismissModal()}
            />
        }
        {
          things.map((id) => (
            <div key={id} className='thing'>
              <a
                className='thingLink'
                href={`/thing?id=${id}`}
                onClick={(e) => this.showThing(e, id)}
              >
                Thing {id}
              </a>
            </div>
          ))
        }
        <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }

          .thing {
            display: inline-block;
          }

          .thingLink {
            color: #333;
            verticalAlign: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 250px;
            line-height: 250px;
            margin: 10px;
            border: 2px solid transparent;
          }

          .thingLink:hover {
            borderColor: blue;
          }
        `}</style>
      </div>
    )
  }
}
