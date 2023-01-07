import 'normalize.css'
import './assets/styles/base.css'
import './assets/styles/main.css'
import monaco from './utils/monaco'
import vitesseDark from 'theme-vitesse/themes/vitesse-dark.json'

monaco.editor.defineTheme('vitesse-dark', vitesseDark)

monaco.editor.create(document.getElementById('app'), {
  value: '',
  language: 'javascript',
  theme: 'vitesse-dark',
  cursorSmoothCaretAnimation: true,
  detectIndentation: false,
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSize: 16,
  smoothScrolling: true,
  tabSize: 2,
  unicodeHighlight: {
    ambiguousCharacters: false,
    invisibleCharacters: false
  }
})
