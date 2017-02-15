import React from 'react'
import Thing from '../components/thing'

export default ({ url: { query: { id } } }) => (
  <div className='permalink'>
    <div className='wrap'>
      <Thing id={id} />
    </div>
    <style jsx>{`
      .permalink {
        padding: 100px;
        text-align: center;
      }

      .wrap {
        display: inline-block;
        border: 1px solid #999;
        margin: auto;
      }
    `}</style>
  </div>
)
