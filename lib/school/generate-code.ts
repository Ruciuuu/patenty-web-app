import { createHash, randomBytes } from 'node:crypto'


export function generateInvitationCode(): string {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const bytes = randomBytes(8)

    const code = Array.from(bytes, (byte) => {
        return alphabet[byte % alphabet.length]
    }).join('')

    return `${code.slice(0, 4)}-${code.slice(4)}`
}

export function hashInvitationCode(code: string): string {
    return createHash('sha256')
        .update(
            code
                .replace(/-/g, '')
                .trim()
                .toUpperCase()
        )
        .digest('hex')
}