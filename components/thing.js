import React from 'react'
import Link from 'next/link'
//TODO query gql for the thing with uuid
export default ({ id }) => (
  <div className='thing'>
    <div className='uuid'>
      UUID: {id}
    </div>

    <div className='sidebar'>
      <ul className='sidebarList'>
  <li>
  This is a thing
        </li>
      </ul>
    </div>

    <style jsx>{`
      .thing {
        overflow: hidden;
        display: inline-block;
      }

      .uuid {
        float: left;
        height: 100px;
        background: #333;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
      }

      .sidebar {
        float: right;
        background: #fff;
        width: 200px;
        height: 100px;
        text-align: left;
        box-sizing: border-box;
        padding: 20px;
        font-family: Monaco;
        font-size: 11px;
      }

      .sidebarList {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
    `}</style>
  </div>
)
