import { Component, Template, Attribute } from '@scoutgg/widgets'
import routes from '../../config/routes.js'
import page from 'page'

@Component('demo')
@Template(function (html) { html `${this.route}` })
export default class PageRouter extends HTMLElement {
  connectedCallback() {
    this.route = ''
    Object.keys(routes).forEach(route => {
      page(route, (context, next) => {

        const elem = typeof routes[route] === 'function' ? new routes[route]() : new routes[route].component()

        if(routes[route].class) elem.classList.add(routes[route].class)
        this.setAttribute('class', routes[route].parentClass || '')

        Object.keys(context.params).forEach((attribute)=> {
          if(!isNaN(attribute)) return
          elem.setAttribute(attribute, context.params[attribute])
        })
        this.route = elem
        this.render(()=> {
          this.emit('routeChanged', { context })
        })

      })
    })
    page()
  }
}
