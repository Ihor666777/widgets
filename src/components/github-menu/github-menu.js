import { Component, Template } from '@scoutgg/widgets'
import capitalize from 'lodash/capitalize'
import lowerCase from 'lodash/lowerCase'
import config from '../../config'

@Component('docs')
@Template(function (html) {
  html `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-top: 1em;
        background-color: #f3fafc;
        border-right: 1px solid #c3dde6;
        color: var(--accent-color-text);
        padding: 1em;
        box-sizing: border-box;
        min-height: calc(100vh - 53px);
      }
      h1 {
        font-size: 1.5em;
        font-family: var(--accent-font);
        color: var(--accent-color-1);
      }
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      li {
        margin: .5em 0;
        font-size: .9em;
      }
      a {
        text-decoration: none;
        color: var(--accent-color-2);
        font-weight: 500;
      }
    </style>
    <h1>docs</h1>
    <ul>
      ${(this.pages || []).map((page)=> {
        return `
          <li>
            <a href="${config.basePath || ''}/docs/${page}">
              ${capitalize(lowerCase(this.removeLeadingNumber(page)))}
            </a>
          </li>`
      })}
    </ul>
  `
})
export default class GithubMenu extends HTMLElement {
  async connectedCallback() {
    // Load markdown file-tree from github
    let pages = await fetch('https://api.github.com/repos/scoutgg/widgets-docs/git/trees/master')
    pages = await pages.json()
    // Get the file paths, filter the out non-markdown files,
    // remove trailing .md extension.
    this.pages = pages.tree
      .map(file=>file.path)
      .filter(file=>file.includes('.md') && file !== 'README.md')
      .map(file=> file.slice(0, file.indexOf('.md')))
    this.render()
  }
  // Github markdown files comes with a leading number for some files. We
  // do this to make github sort them above the alphabetical order.
  removeLeadingNumber(name) {
    if(!isNaN(name[0])) name = name.slice(name.indexOf('-'), name.length)
    return name
  }
}
