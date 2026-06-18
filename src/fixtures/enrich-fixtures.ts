export function enrichFixtures(fixtures: Record<string, any[]>) {
  const hostToPool = new Map<string, string>()
  for (const host of fixtures.hosts || []) {
    hostToPool.set(host.id, host.$pool)
  }

  const pifToHost = new Map<string, string>()
  for (const host of fixtures.hosts || []) {
    for (const pifId of host.PIFs || []) {
      pifToHost.set(pifId, host.id)
    }
  }

  enrichSrs(fixtures, hostToPool)
  enrichNetworks(fixtures, pifToHost, hostToPool)
}

function setPool(item: any, poolId: string) {
  item.$pool = poolId
  item.$poolId = poolId
  item.pool = poolId
}

function enrichSrs(
  fixtures: Record<string, any[]>,
  hostToPool: Map<string, string>,
) {
  const srToPool = new Map<string, string>()
  for (const pbd of fixtures.pbds || []) {
    if (pbd.attached && !srToPool.has(pbd.SR)) {
      const poolId = hostToPool.get(pbd.host)
      if (poolId) {
        srToPool.set(pbd.SR, poolId)
      }
    }
  }

  for (const sr of fixtures.srs || []) {
    const poolId = srToPool.get(sr.id)
    if (poolId) {
      setPool(sr, poolId)
    }
  }
}

function enrichNetworks(
  fixtures: Record<string, any[]>,
  pifToHost: Map<string, string>,
  hostToPool: Map<string, string>,
) {
  for (const network of fixtures.networks || []) {
    for (const pifId of network.PIFs || []) {
      const hostId = pifToHost.get(pifId)
      if (hostId) {
        const poolId = hostToPool.get(hostId)
        if (poolId) {
          setPool(network, poolId)
          break
        }
      }
    }
  }
}
