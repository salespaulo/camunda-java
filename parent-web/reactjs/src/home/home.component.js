
import React from 'react'
import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Errors from '../error/errors.component'
import { me, signout } from '../auth'
import { post } from '../shared/http'

import './home.component.css'

import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarBurger,
    NavbarStart,
    NavbarMenu,
    NavbarLink,
    NavbarDropdown,
    NavbarDivider,
    NavbarEnd,
    Icon,
    Field,
    Control,
    Button
} from 'bloomer'

const data = {
    email: 'desconhecido',
    isActive: false,
    errors: []
}

class Home extends Component {

    constructor(props) {
        super()
        this.state = data
        this.onClickNav = this.onClickNav.bind(this)
        this.onCheckoutGoods = this.onCheckoutGoods.bind(this)
        this.onCreateOrder = this.onCreateOrder.bind(this)
        this.onShip = this.onShipOrder.bind(this)
        this.onOrderProcessed = this.onOrderProcessed.bind(this)

        this.clearErrors = this.clearErrors.bind(this)
    }

    profile() {
        return me()
            .then(res => {
                if (res.status === 401) {
                    signout()
                    this.props.history.push('/')
                } else {
                    this.setState({ email: res.data.user})
                }
            })
            .catch(err => this.addError(err))
        }

    componentDidMount() {
        this.profile()
        post('/cam/order/deploy').then(res => console.log('>>>> deploy res', res))
    }

    onClickNav = e => console.log('onClickNav')

    onCheckoutGoods = e => {
        post('/cam/order/process')
            .then(res => console.log('>>>>>>>> cam deploy cam process response', res))
            .catch(err => console.log('>>>>>>>>> errr', err))
    }
    
    onCreateOrder = e => {
        post('/cam/order/checkout')
            .then(res => console.log('>>>>>>>> cam order checkout response', res))
            .catch(err => console.log('>>>>>>>>> errr', err))
    }

    onShipOrder = e => {
        post('/cam/order/shipment')
            .then(res => console.log('>>>>>>>> cam order shipment response', res))
            .catch(err => console.log('>>>>>>>>> errr', err))
    }

    onOrderProcessed = e => {
        console.log('>>>> Nao existe uma acao aqui!! Pq?')
    }

    clearErrors(e) {
        this.setState({ errors: [] })
    }

    addError(error) {
        const errors = [error].concat(this.state.errors)
        this.setState({ errors: errors })
    }

    render() {
        return (
            <Navbar style={{ borderBottom: 'solid 1px #0F000F', margin: '0' }}>
                <NavbarBrand>
                    <NavbarItem target="_blank" href="#">
                        <h1>camunda-node-external</h1>
                    </NavbarItem>
                    <NavbarItem isHidden='desktop'>
                        <Icon className='fab fa-github' />
                    </NavbarItem>
                    <NavbarItem isHidden='desktop'>
                        <Icon className='fab fa-twitter' style={{ color: '#55acee' }} />
                    </NavbarItem>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                </NavbarBrand>
                <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
                    <NavbarStart>
                        <NavbarItem href='/home'>Home</NavbarItem>
                        <NavbarItem hasDropdown isHoverable>
                            <NavbarLink href='#/'>Documentation</NavbarLink>
                            <NavbarDropdown>
                                <NavbarItem href='#/' onClick={this.onCheckoutGoods}>Checkout Goods</NavbarItem>
                                <NavbarItem href='#/' onClick={this.onCreateOrder}>Create Order</NavbarItem>
                                <NavbarItem href='#/' onClick={this.onShipOrder}>Ship Order</NavbarItem>
                                <NavbarDivider />
                                <NavbarItem href='#/' onClick={this.onOrderProcessed}>Order Processed</NavbarItem>
                            </NavbarDropdown>
                        </NavbarItem>
                    </NavbarStart>
                    <NavbarEnd>
                        <NavbarItem href="https://github.com/" isHidden='touch'>
                            <Icon className='fab fa-github' />
                        </NavbarItem>
                        <NavbarItem href="https://twitter.com/" isHidden='touch'>
                            <Icon className='fab fa-twitter' style={{ color: '#55acee' }} />
                        </NavbarItem>
                        <NavbarItem>
                            <Field isGrouped>
                                <Control>
                                    { this.state.email }
                                    <Button id="logout" href="/signout">
                                        <Icon className="fas fa-sign-out-alt" />
                                        <span>Sair</span>
                                    </Button>
                                </Control>
                            </Field>
                        </NavbarItem>
                    </NavbarEnd>
                </NavbarMenu>
                <Errors errors={this.state.errors} onDelete={this.clearErrors}/>
            </Navbar>
        )
    }
}

export default withRouter(Home)
