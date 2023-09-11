import { mplex } from "@libp2p/mplex"
import { createLibp2p } from "libp2p"
import { noise } from "@chainsafe/libp2p-noise"
import { circuitRelayServer } from 'libp2p/circuit-relay'
import { webSockets } from '@libp2p/websockets'
import * as filters from '@libp2p/websockets/filters'
import { identifyService } from 'libp2p/identify'

const server = await createLibp2p({
    addresses: {
        announce: ['/dns4/0.tcp.ngrok.io/tcp/11142/ws'],  // <-- change this to your ngrok url
        listen: ['/ip4/127.0.0.1/tcp/4002/ws']
    },
    transports: [
        webSockets({
            filter: filters.all
        }),
    ],
    connectionEncryption: [noise()],
    streamMuxers: [mplex()],
    services: {
        identify: identifyService(),
        relay: circuitRelayServer()
    }
})

console.log("p2p addr: ", server.getMultiaddrs().map((ma) => ma.toString()))
