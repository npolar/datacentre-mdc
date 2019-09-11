//import { style } from "./upload-style.js";
import '@vaadin/vaadin-upload/theme/material/vaadin-upload-styles.js';
import { UploadElement } from "@vaadin/vaadin-upload/src/vaadin-upload.js";

export class Upload extends UploadElement {}
//Upload.styles = style;
customElements.define("upload-v", Upload);
