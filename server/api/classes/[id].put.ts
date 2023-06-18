export default defineEventHandler(async (event) => {
  return {
    body: event.context.params.id,
    action: "Update"
  }
})
