import React from 'react'
import Router from 'next/router'
import Sidebar from 'react-sidebar'
import MaterialTitlePanel from '../components/materialTitlePanel'
import SidebarContent from '../components/sidebarContent'
import withData from '../lib/withData'
import ThingsList from '../components/thingsList'
import Modal from '../components/modal'
import Head from '../components/head'

export default class extends React.Component {
  static getInitialProps () {
    return {
    }
  }
  constructor (props) {
    super(props)
    this.state = {docked: true, open: false, pullRight: true}
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  // handling escape close
  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown)
    const mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDown)
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
  mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
  }
  onKeyDown (e) {
    if (!this.props.url.query.thingId) return
    if (e.keyCode === 27) {
      this.props.url.back()
    }
  }
  toggleOpen(ev) {
    this.setState({open: !this.state.open});

    if (ev) {
      ev.preventDefault();
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
    const { url } = this.props
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
      {
        !this.state.docked &&
        <a onClick={() => this.toggleOpen()}
        href="#"
        className='contentHeaderMenuLink'>
        =
        </a>
      }
      <span> Grow IoT</span>
      </span>);

    const sidebarProps = {
      styles: {
        sidebar: {
          zIndex: 0,
          top: 0,
          bottom: 0,
          transition: 'transform .3s ease-out',
          WebkitTransition: '-webkit-transform .3s ease-out',
          willChange: 'transform',
          overflowY: 'auto',
        },
      },
      sidebar,
      docked: this.state.docked,
      pullRight: this.state.pullRight,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    };
    return (
      <div>
      <Head>
      </Head>
      <Sidebar {...sidebarProps}>
      <MaterialTitlePanel title={contentHeader}>

      <div className='list sidebarContent'>
      {
        url.query.thingId &&
        <Modal
        id={url.query.thingId}
        onDismiss={() => this.dismissModal()}
        />
      }
      {
        // withData((props) => (
          <ThingsList />
        // ))
        }
        <style jsx>{`
          .contentHeaderMenuLink: {
            textDecoration: none,
            color: white,
            padding: 8,
          }
          .sidebarContent: {
            padding: 16px,
          }
          .list {
            padding: 50px;
            text-align: center;
          }

          `}</style>
      </div>
</MaterialTitlePanel>
</Sidebar>
</div>
    )
  }
}
