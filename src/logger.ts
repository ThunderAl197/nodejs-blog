import pino from 'pino'
import {PinoPretty} from 'pino-pretty'


export const logger = pino({
    prettyPrint: {
        colorize: true,
        translateTime: 'dd-mm-yyyy HH:MMo',
        suppressFlushSyncWarning: true,
    },
    prettifier: PinoPretty,
})
