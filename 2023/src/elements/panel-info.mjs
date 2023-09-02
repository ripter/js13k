
class PanelInfo extends HTMLElement {
  render(props) {
    this.innerHTML = `<h1>TODO: Info</h1>`;
  }
}
customElements.define('panel-info', PanelInfo);
