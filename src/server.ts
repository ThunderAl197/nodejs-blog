import fastify from "fastify";
import { logger } from "@/logger";
import mainPageTemplate from '@/twig/pages/main.twig'

export async function startHttpServer(address: string, port: number) {
    const http = fastify({
        logger
    })

    http.get('/', async (req,repl) => {
        repl.type('text/html')
        repl.send(mainPageTemplate())
    })

    await http.listen(port, address)
}