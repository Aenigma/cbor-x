export { Encoder, addExtension, encode, NEVER, ALWAYS, DECIMAL_ROUND, DECIMAL_FIT, REUSE_BUFFER_MODE } from './encode.js'
export { Tag, Decoder, decodeMultiple, decode, FLOAT32_OPTIONS, clearSource, roundFloat32 } from './decode.js'
export { EncoderStream, DecoderStream } from './stream.js'
export { decodeIter, encodeIter } from './iterators.js'
export const useRecords = false
export const mapsAsObjects = true
import { setExtractor } from './decode.js'
import { createRequire } from 'module'

const extractor = tryRequire('cbor-extract')
if (extractor)
	setExtractor(extractor.extractStrings)

function tryRequire(moduleId) {
	try {
		let require = createRequire(import.meta.url)
		return require(moduleId)
	} catch (error) {
		if (typeof window == 'undefined')
			console.warn('Native extraction module not loaded, cbor-x will still run, but with decreased performance. ' + error.message.split('\n')[0])
		else
			console.warn('For browser usage, directly use cbor-x/decode or cbor-x/encode modules. ' + error.message.split('\n')[0])
	}
}
