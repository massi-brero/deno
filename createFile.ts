const encoder = new TextEncoder()

const greetText = encoder.encode('Hello World\nIch bin da Massi...')

await Deno.writeFile('greet.txt', greetText)
