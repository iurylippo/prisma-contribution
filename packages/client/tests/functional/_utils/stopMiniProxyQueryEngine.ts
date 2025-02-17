import Debug from '@prisma/debug'
import nodeFetch from 'node-fetch'

import type { DataProxyEngine } from '../../../src/runtime/core/engines'

const debug = Debug('prisma:test:stop-engine')

export async function stopMiniProxyQueryEngine(client: any): Promise<void> {
  const engine = client._engine as DataProxyEngine

  const host = engine.host
  const clientVersion = await engine.remoteClientVersion
  const schemaHash = engine.inlineSchemaHash

  debug('stopping mini-proxy query engine at', host)

  const response = await nodeFetch(`https://${host}/_mini-proxy/${clientVersion}/${schemaHash}/stop-engine`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${engine.apiKey()}`,
    },
  })

  debug('response status', response.status)
}
