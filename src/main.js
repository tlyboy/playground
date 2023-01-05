import 'normalize.css'
import './assets/base.css'
import './assets/main.css'
import monaco from './utils/monaco'

monaco.editor.create(document.getElementById('app'), {
  value: '',
  language: 'javascript'
})
