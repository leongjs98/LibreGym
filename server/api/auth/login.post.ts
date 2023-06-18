export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log("successfu")
  return {
    body: body
  }
})
