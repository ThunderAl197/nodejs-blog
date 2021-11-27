import { program } from 'commander'
import pkg from '../package.json'
import { logger } from './logger'
import { startHttpServer } from './server'

program.name(pkg.name)
program.version(pkg.version)
program.description(`${pkg.description} by ${pkg.author}`)

program.command('serve')
    .option('-a --address <address>', 'Server listen address', '127.0.0.1')
    .option('-p --port <port>', 'Server listen port', '8000')
    .action(async args => {
        await startHttpServer(args.address, parseInt(args.port) || 8000)
    })


async function run() {
    try {
        await program.parseAsync(process.argv)

        if (program.args.length === 0) {
            program.outputHelp({ error: true })
            process.exit(1)
        }

    } catch (e: any) {
        logger.fatal(e?.nestedError ?? e?.message ?? 'Error', e)

        if (e instanceof Error) {
            for (const stackElement of (e.stack ?? '').split(/\r?\n/)) {
                logger.fatal(stackElement)
            }
        }

        process.exit(e?.exitCode ?? 1)
    }
}

run().catch(console.error)