import 'normalize.css'
import './assets/styles/base.css'
import './assets/styles/main.css'
import monaco from './utils/monaco'

monaco.editor.create(document.getElementById('app'), {
  value: '',
  language: 'javascript'
})
