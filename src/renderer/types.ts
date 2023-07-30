export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };
export type { Component };

import { Pinia } from 'pinia';
import { renderToNodeStream } from '@vue/server-renderer';
import type {
  PageContextBuiltIn,
  // When using Client Routing https://vite-plugin-ssr.com/clientRouting
  // PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient,
  // When using Server Routing
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from 'vite-plugin-ssr/types';
import type { ComponentPublicInstance } from 'vue';
import { User } from '#root/common/entities/user.interface';
import { packRules } from '@casl/ability/extra';
import { IncomingHttpHeaders } from 'http';

type Component = ComponentPublicInstance; // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086
type PageProps = Record<string, unknown>;

export type PageContextCustom = {
  Page: Component;
  pageProps?: PageProps;
  urlPathname: string;
  redirectTo?: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
  documentProps?: {
    title: string;
  };
  initialStoreState: Pinia['state']['value'];
  user?: User;
  /** `passToClient` cannot serialize CASL ability  and, therefore, cannot be passed to the client.
   * Thus, it must be packed first using CASL's `packRules` feature and then unpacked on client.
   *
   * * Refer to https://casl.js.org/v6/en/api/casl-ability-extra#pack-rules for the method
   * * Refer to https://github.com/brillout/json-serializer for the serializer
   */
  ability?: ReturnType<typeof packRules>;
  stream: ReturnType<typeof renderToNodeStream>;
  enableEagerStreaming: boolean;
  headers?: IncomingHttpHeaders;
};

// Refer to pageContext https://vite-plugin-ssr.com/pageContext
// Refer to Lifecycle: https://vite-plugin-ssr.com/pageContext#lifecycle
// > "Vite-plugin-ssr adds information to pageContext only while rendering the page,
//   and we recommend to treat pageContext as read-only after the rendering of the page is finished."

type PageContextServer = PageContextBuiltIn<Component> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Component> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;
