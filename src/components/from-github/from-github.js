import { Component, Template, Attribute } from '@scoutgg/widgets'
import '../markdown/markdown'
import '../github-menu/github-menu'

@Component('demo')
@Attribute('slug', String)
@Template(function (html) {
  html `
<style>
  :host {
    display: flex;
  }
  demo-github-menu {
    min-width: 340px;
    margin-right: 1em;
  }
  demo-markdown {
    width: 100%;
    max-width: 1000px;
    flex: 1;
  }
</style>
<demo-github-menu></demo-github-menu>
<demo-markdown>${{html: this.markdown}}</demo-markdown>
  `
})
export default class FromGithub extends HTMLElement {
  async connectedCallback() {
    const response = await fetch(`https://cdn.rawgit.com/scoutgg/widgets-docs/master/${this.slug}.md`)
    this.markdown = await response.text()
    this.render()
  }
}
