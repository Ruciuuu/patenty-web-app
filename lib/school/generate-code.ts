import { randomInt } from 'node:crypto'

export function generateInvitationCode(): string {
    return randomInt(0, 1_000_000)
        .toString()
        .padStart(6, '0')
}

export function normalizeInvitationCode(
    value: string
): string {
    return value
        .replace(/\D/g, '')
        .slice(0, 6)
}

export function isValidInvitationCode(
    value: string
): boolean {
    return /^\d{6}$/.test(
        normalizeInvitationCode(value)
    )
}