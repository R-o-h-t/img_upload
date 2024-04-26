import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-root')
export class App extends LitElement {
  @property({ type: Array })
  files: string[] = [];

  @property({ type: Boolean })
  loading = true;

  // error message
  @property({ type: String })
  error = '';


  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
      color: var(--app-text-color, black);
      font-family: Arial, sans-serif;

    }
    input[type="file"] {
      display: none;
    }
    label {
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      cursor: pointer;
    }
    button {
      margin-top: 10px;
      padding: 10px;
      background-color: #008CBA;
      color: white;
      border: none;
      cursor: pointer;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 10px;
      background-color: #f2f2f2;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 400px;
    }
    .skeleton {
      background: #ddd;
      border-radius: 4px;
      height: 20px;
      width: 100%;
      animation: shimmer 1s infinite;
    }
    @keyframes shimmer {
      0% { background-position: -200px; }
      100% { background-position: 200px; }
    }
    .col {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 400px;
      max-height: 600px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  `;


  async handleFileUpload(e) {
    this.error = '';
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch(`${process.env.VITE_APP_API_URL}/files/`, {
      method: 'POST',
      body: formData,
    });


    const result = await response.json();
    if (result.error) {
      this.error = result.error;
      return;
    }
    const file = result.info.split("'")[1];
    this.files = [...this.files, file];
  }

  async connectedCallback() {
    super.connectedCallback();
    const response = await fetch(`${process.env.VITE_APP_API_URL}/files/`);
    const result = await response.json();
    this.files = result.files;
    this.loading = false;
  }

  render() {
    if (this.loading) return html`
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
    `;
    return html`
    <h1>File Upload</h1>
      <label for="file-upload">Select a file</label>
      <input id="file-upload" @change=${this.handleFileUpload} type="file" accept="image/*">
      ${this.error ? html`<p style="color: red;">${this.error}</p>` : ''}
      <div class="col">
        <h3>Files</h3>
        <ul>
          ${this.files.map(file => html`<li>${file} </li>`)}
        </ul>
      </div>
    `;
  }
}
