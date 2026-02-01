import type { Ref } from "vue"

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789@#$%^&*'

export function glitchText(targetText: string, isAnimating: Ref<boolean>, displayText: Ref<string>, duration = 1500) {
    if (isAnimating.value) return
    isAnimating.value = true

    const steps = 20
    const stepDuration = duration / steps
    let iteration = 0

    const interval = setInterval(() => {
        displayText.value = targetText
        .split('')
        .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return targetText[index]
            return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')
        
        iteration += targetText.length / steps
        
        if (iteration >= targetText.length) {
        displayText.value = targetText
        clearInterval(interval)
        isAnimating.value = false
        }
    }, stepDuration)
}