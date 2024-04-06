import type * as Monaco from 'monaco-editor'
import * as monaco from 'monaco-editor'

export const _useMonacoState = () => ref<typeof Monaco | null>(monaco)

export const useMonaco = (): typeof Monaco | null => _useMonacoState().value
