const file = await Deno.open(Deno.args[0])

await Deno.copy(file, Deno.stdout)
file.close()
