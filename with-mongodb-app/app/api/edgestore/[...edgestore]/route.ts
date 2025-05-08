import { initEdgeStore } from "@edgestore/server"
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app"

//This file is used to create the connection to cloud storage
const es = initEdgeStore.create()

//Connect to the bucket being used to store images
const edgeStoreRouter = es.router({
    myPublicImages: es.imageBucket()
})

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter
})

export { handler as GET, handler as POST }

export type EdgeStoreRouter = typeof edgeStoreRouter