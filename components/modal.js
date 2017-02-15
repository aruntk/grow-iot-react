import React from 'react'
import Thing from './thing'

export default class extends React.Component {
  dismiss (e) {
    if (this._shim === e.target ||
       this._thingWrap === e.target) {
      if (this.props.onDismiss) {
        this.props.onDismiss()
      }
    }
  }

  render () {
    return (
      <div ref={el => (this._shim = el)} className='shim' onClick={(e) => this.dismiss(e)}>
        <div ref={el => (this._thingWrap = el)} className='thing'>
          <Thing id={this.props.id} />
        </div>
        <style jsx>{`
          .shim {
            position: fixed;
            background: rgba(0,0,0,.65);
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
          }

          .thing {
            position: absolute;
            top: 50%;
            width: 100%;
            margin-top: -250px;
          }
        `}</style>
      </div>
    )
  }
}
