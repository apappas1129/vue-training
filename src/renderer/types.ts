export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }
export type { PageProps }
export type { Component }

import { Pinia } from 'pinia'
import { renderToNodeStream } from '@vue/server-renderer'
import type {
  PageContextBuiltIn,
  // When using Client Routing https://vite-plugin-ssr.com/clientRouting
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
  // When using Server Routing
  // PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient
} from 'vite-plugin-ssr/types'
import type { ComponentPublicInstance } from 'vue'

type Component = ComponentPublicInstance // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086
type PageProps = Record<string, unknown>

export type PageContextCustom = {
  Page: Component
  pageProps?: PageProps
  urlPathname: string
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
  },
  documentProps?: {
    title: string
  }
  initialStoreState: Pinia['state']['value'],
  stream: ReturnType<typeof renderToNodeStream>,
  enableEagerStreaming: boolean,
}

type PageContextServer = PageContextBuiltIn<Component> & PageContextCustom
type PageContextClient = PageContextBuiltInClient<Component> & PageContextCustom

type PageContext = PageContextClient | PageContextServer
